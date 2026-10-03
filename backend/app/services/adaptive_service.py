from __future__ import annotations

import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

from sqlalchemy.orm import Session

from app.algorithms.bkt import update_mastery
from app.models.assessment import Assessment, AssessmentQuestion, AssessmentResult
from app.models.concept import Concept
from app.models.learning import LearningSession
from app.models.progress import MasteryBreakdown, ProgressSnapshot
from app.models.resource import Resource
from app.models.roadmap import RoadmapItem
from app.models.student import Student


def slug(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return value[:90] or "concept"


def status_for_mastery(mastery: float, locked: bool = False) -> str:
    if locked:
        return "locked"
    if mastery >= 80:
        return "mastered"
    if mastery < 45:
        return "weak"
    return "learning"


def extract_topics(text: str, limit: int = 24) -> list[tuple[str, str]]:
    """Extract likely concepts from headings and short definition-like lines."""
    lines = [re.sub(r"\s+", " ", x.strip()) for x in text.splitlines() if x.strip()]
    candidates: list[tuple[str, str]] = []
    seen: set[str] = set()
    for line in lines:
        clean = re.sub(r"^[#\-•*\d.)\s]+", "", line).strip()
        if not clean or len(clean) < 3 or len(clean) > 120:
            continue
        looks_like_heading = line.startswith("#") or line.isupper() or len(clean.split()) <= 8
        if not looks_like_heading:
            continue
        key = slug(clean)
        if key in seen or key in {"contents", "references", "introduction"}:
            continue
        seen.add(key)
        candidates.append((clean, " ".join(lines[max(0, lines.index(line)):max(0, lines.index(line))+3])[:500]))
        if len(candidates) >= limit:
            break
    return candidates


def build_concepts(db: Session, student: Student, resource_text: str | None = None) -> list[Concept]:
    topics = extract_topics(resource_text or "")
    if not topics:
        # This is a real generated starter map, not seeded learner data. It gives the learner
        # an editable scaffold when they choose not to provide material.
        base = [
            (f"{student.subject} foundations", f"Core terminology, principles, and mental models for {student.subject}."),
            (f"{student.subject} core concepts", f"The central concepts required for {student.goal or 'practical competence'} in {student.subject}."),
            (f"{student.subject} application", f"Applying {student.subject} concepts to standard problems and examples."),
            (f"{student.subject} problem solving", f"Solving unfamiliar problems using {student.subject}."),
            (f"{student.subject} project practice", f"Integrating {student.subject} knowledge into a substantial task."),
        ]
        topics = base

    concepts: list[Concept] = []
    previous: Concept | None = None
    cols = 3
    for index, (name, description) in enumerate(topics):
        key = slug(name)
        concept = db.query(Concept).filter(Concept.student_id == student.id, Concept.concept_key == key).first()
        if not concept:
            concept = Concept(
                concept_key=key,
                student_id=student.id,
                name=name,
                mastery=0,
                status="learning" if index == 0 else "locked",
                difficulty=min(0.35 + index * 0.025, 0.9),
                x=(index % cols) * 260,
                y=(index // cols) * 170,
                description=description,
            )
            db.add(concept)
            db.flush()
        elif not concept.description:
            concept.description = description
        if previous and previous not in concept.prerequisites:
            concept.prerequisites.append(previous)
        concepts.append(concept)
        previous = concept
    db.commit()
    return concepts


def recompute_roadmap(db: Session, student: Student) -> list[RoadmapItem]:
    concepts = db.query(Concept).filter(Concept.student_id == student.id).all()
    existing = {item.concept_id: item for item in db.query(RoadmapItem).filter(RoadmapItem.student_id == student.id).all()}

    def priority(c: Concept) -> float:
        gap = 100 - c.mastery
        prereq_gap = sum(max(0, 70 - p.mastery) for p in c.prerequisites)
        goal_bonus = 20 if student.goal and ("exam" in student.goal.lower() or "interview" in student.goal.lower()) and c.difficulty < 0.8 else 0
        return gap + prereq_gap * 0.7 + goal_bonus + c.difficulty * 10

    ranked = sorted(concepts, key=priority, reverse=True)
    # Only concepts whose prerequisites are sufficiently learned are actionable.
    ordered: list[Concept] = []
    for concept in ranked:
        if all(p.mastery >= 60 for p in concept.prerequisites) or not concept.prerequisites:
            ordered.append(concept)
    for concept in ranked:
        if concept not in ordered:
            ordered.append(concept)

    keep_ids = set()
    for index, concept in enumerate(ordered):
        keep_ids.add(concept.id)
        blocked = any(p.mastery < 60 for p in concept.prerequisites)
        if concept.mastery >= 80:
            status = "done"
        elif index == 0 and not blocked:
            status = "current"
        else:
            status = "upcoming"
        minutes = max(15, round((0.75 + concept.difficulty) * 35))
        item = existing.get(concept.id)
        if not item:
            item = RoadmapItem(student_id=student.id, concept_id=concept.id)
            db.add(item)
        item.title = concept.name
        item.meta = "Knowledge gap" if concept.mastery < 45 else ("Prerequisite" if concept.prerequisites else "Foundation")
        item.mastery = concept.mastery
        item.status = status
        item.time = f"{minutes} min"
        item.description = concept.description or "Build and test this concept."
        item.order_index = index

    for item in existing.values():
        if item.concept_id not in keep_ids:
            db.delete(item)
    db.commit()
    return db.query(RoadmapItem).filter(RoadmapItem.student_id == student.id).order_by(RoadmapItem.order_index).all()


def update_student_progress(db: Session, student: Student) -> None:
    concepts = db.query(Concept).filter(Concept.student_id == student.id).all()
    student.total_concepts = len(concepts)
    student.concepts_mastered = sum(c.mastery >= 80 for c in concepts)
    student.overall_mastery = round(sum(c.mastery for c in concepts) / len(concepts), 1) if concepts else 0
    student.study_time_planned_hours = round(student.plan_days * student.study_hours_per_day * 5 / 7, 1)

    snapshot = ProgressSnapshot(
        student_id=student.id,
        overall_mastery=student.overall_mastery,
        study_time_hours=student.study_time_hours,
        assessments=db.query(Assessment).filter(Assessment.student_id == student.id, Assessment.status == "completed").count(),
        accuracy=0,
        reviews_due=sum(c.mastery < 60 for c in concepts),
    )
    db.add(snapshot)
    db.query(MasteryBreakdown).filter(MasteryBreakdown.student_id == student.id).delete()
    for c in concepts:
        db.add(MasteryBreakdown(student_id=student.id, concept_id=c.id, name=c.name, value=c.mastery))
    db.commit()


def create_diagnostic(db: Session, student: Student) -> Assessment:
    existing = db.query(Assessment).filter(Assessment.student_id == student.id, Assessment.status == "pending").first()
    if existing:
        return existing
    concepts = db.query(Concept).filter(Concept.student_id == student.id).all()
    questions = []
    for index, concept in enumerate(concepts[: min(8, len(concepts))]):
        description = concept.description or f"the core idea behind {concept.name}"
        questions.append((
            f"Which statement best describes {concept.name}?",
            [description, f"A topic unrelated to {student.subject}.", "A database storage setting only.", "A scheduling preference."],
            0,
        ))
    assessment = Assessment(student_id=student.id, title="Diagnostic assessment", status="pending")
    db.add(assessment)
    db.flush()
    for index, (question, options, answer) in enumerate(questions):
        db.add(AssessmentQuestion(assessment_id=assessment.id, question=question, options=options, answer_index=answer, order_index=index))
    db.commit()
    db.refresh(assessment)
    return assessment


def submit_assessment(db: Session, assessment: Assessment, answers: list[int]) -> dict:
    if assessment.status == "completed" and assessment.result:
        return {"assessment": assessment, "result": assessment.result}
    questions = sorted(assessment.questions, key=lambda q: q.order_index)
    correct = 0
    touched: list[Concept] = []
    concepts = db.query(Concept).filter(Concept.student_id == assessment.student_id).all()
    for i, question in enumerate(questions):
        is_correct = i < len(answers) and answers[i] == question.answer_index
        correct += int(is_correct)
        if i < len(concepts):
            concept = concepts[i]
            concept.mastery = round(update_mastery(concept.mastery / 100, is_correct) * 100, 1)
            concept.status = status_for_mastery(concept.mastery, any(p.mastery < 45 for p in concept.prerequisites))
            touched.append(concept)
    score = round((correct / len(questions)) * 100) if questions else 0
    assessment.status = "completed"
    assessment.completed_at = datetime.now(timezone.utc)
    result = AssessmentResult(
        assessment_id=assessment.id,
        new_mastery=score,
        delta=f"{correct} / {len(questions)} correct",
        summary="Mastery estimates were updated from the diagnostic answers and the learning path was recalculated.",
    )
    db.add(result)
    db.commit()
    student = db.query(Student).filter(Student.id == assessment.student_id).first()
    update_student_progress(db, student)
    recompute_roadmap(db, student)
    db.refresh(assessment)
    return {"assessment": assessment, "result": result}
