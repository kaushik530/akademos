from datetime import datetime, timedelta, timezone
from pathlib import Path
import os
import uuid

from fastapi import APIRouter, Depends, File, Header, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.assessment import Assessment
from app.models.concept import Concept
from app.models.learning import LearningSession
from app.models.progress import ProgressSnapshot, MasteryBreakdown
from app.models.resource import Resource
from app.models.student import Student
from app.services.adaptive_service import build_concepts, create_diagnostic, recompute_roadmap, submit_assessment, update_student_progress
from app.schemas import *

router = APIRouter()
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def current_student(db: Session, student_id: str | None) -> Student:
    if not student_id:
        raise HTTPException(401, "No learner session. Complete onboarding first.")
    try: sid = uuid.UUID(student_id)
    except ValueError: raise HTTPException(400, "Invalid learner id")
    student = db.query(Student).filter(Student.id == sid).first()
    if not student: raise HTTPException(404, "Learner not found")
    return student

def student_dep(x_student_id: str | None = Header(default=None, alias="X-Student-ID"), db: Session = Depends(get_db)):
    return current_student(db, x_student_id)

@router.get('/health')
def health(): return {"status":"ok","service":"akademos-api"}

@router.post('/onboarding', response_model=OnboardingResponse)
def onboarding(payload: OnboardingCreate, db: Session = Depends(get_db)):
    student = Student(name=payload.name or "Learner", goal=payload.goal, subject=payload.subject, plan_days=payload.plan_days, study_hours_per_day=payload.study_hours_per_day, target_proficiency=payload.target_proficiency, study_days=",".join(map(str, payload.study_days)))
    db.add(student); db.commit(); db.refresh(student)
    concepts = build_concepts(db, student)
    update_student_progress(db, student)
    recompute_roadmap(db, student)
    assessment = create_diagnostic(db, student)
    return OnboardingResponse(student_id=student.id, assessment_id=assessment.id, concepts=len(concepts))

@router.get('/student', response_model=StudentResponse)
def get_student(student: Student = Depends(student_dep)): return student

@router.get('/dashboard', response_model=DashboardResponse)
def dashboard(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    items = recompute_roadmap(db, student)
    current = next((i for i in items if i.status == 'current'), items[0] if items else None)
    concepts = db.query(Concept).filter(Concept.student_id == student.id).all()
    snapshot = db.query(ProgressSnapshot).filter(ProgressSnapshot.student_id == student.id).order_by(ProgressSnapshot.snapshot_date.desc()).first()
    next_concept = None
    if current:
        c = db.query(Concept).filter(Concept.id == current.concept_id).first() if current.concept_id else None
        next_concept = NextConcept(id=c.concept_key if c else str(current.id), title=current.title, summary=current.description or '', mastery=round(current.mastery), time=current.time or '30 min', path=f"/learn/{c.concept_key if c else current.id}")
    days = []
    today = datetime.now().date()
    for offset in range(7):
        d = today + timedelta(days=offset)
        days.append(ScheduleItem(day=d.strftime('%a').upper(), date=d.strftime('%d'), status='current' if offset == 0 else ('upcoming' if d.weekday() in [0,1,2,3,4] else 'off')))
    planned = student.plan_days * student.study_hours_per_day
    return DashboardResponse(
        title=f"Continue learning, {student.name}.",
        subtitle=f"{student.subject or 'Your subject'} · {round(student.overall_mastery)}% overall mastery",
        metrics=[
            DashboardMetric(label='Overall mastery', value=f'{round(student.overall_mastery)}%', subtext=f'{student.concepts_mastered} concepts mastered', type='mastery'),
            DashboardMetric(label='Concepts', value=f'{student.concepts_mastered} / {len(concepts)}', subtext='at target mastery', type='concepts'),
            DashboardMetric(label='Study time', value=f'{student.study_time_hours:.1f}h', subtext=f'of {planned:.1f}h planned', type='time'),
            DashboardMetric(label='Reviews due', value=str(sum(c.mastery < 60 for c in concepts)), subtext='concepts below 60%', type='streak'),
        ], next_concept=next_concept, schedule=days)

@router.get('/knowledge-graph', response_model=KnowledgeGraphResponse)
def graph(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    concepts = db.query(Concept).filter(Concept.student_id == student.id).all(); edges=[]
    for c in concepts:
        for p in c.prerequisites: edges.append(GraphEdge(source=p.concept_key, target=c.concept_key))
    def compact(c):
        return ConceptResponse(id=c.id, concept_key=c.concept_key, name=c.name, mastery=c.mastery, status=c.status, difficulty=c.difficulty, x=c.x, y=c.y, description=c.description, prerequisites=[], created_at=c.created_at, updated_at=c.updated_at)
    return KnowledgeGraphResponse(concepts=[compact(c) for c in concepts], edges=edges, legend=[GraphLegend(label='Mastered',tone='mastered'),GraphLegend(label='Learning',tone='learning'),GraphLegend(label='Weak',tone='weak'),GraphLegend(label='Locked',tone='locked')])

@router.get('/roadmap', response_model=RoadmapResponse)
def roadmap(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    items=recompute_roadmap(db, student); return RoadmapResponse(summary=RoadmapSummary(title=f'{student.subject or "Learning"} · adaptive path', subtitle=f'{student.plan_days}-day target · {student.study_hours_per_day:g} hours/day', concept_count=len(items), study_hours=f'{student.study_time_hours:.1f} / {student.plan_days*student.study_hours_per_day:.1f}h', updated='Updated just now'), items=items)

@router.get('/progress', response_model=ProgressResponse)
def progress(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    concepts=db.query(Concept).filter(Concept.student_id == student.id).all(); snapshots=db.query(ProgressSnapshot).filter(ProgressSnapshot.student_id==student.id).order_by(ProgressSnapshot.snapshot_date.asc()).all()
    assessments=db.query(Assessment).filter(Assessment.student_id==student.id, Assessment.status=='completed').count()
    latest=snapshots[-1] if snapshots else None
    chart=[ProgressChartPoint(day=s.snapshot_date.strftime('%d %b'), value=round(s.overall_mastery)) for s in snapshots[-8:]]
    breakdown=db.query(MasteryBreakdown).filter(MasteryBreakdown.student_id==student.id).order_by(MasteryBreakdown.value.asc()).all()
    return ProgressResponse(overall_mastery=round(student.overall_mastery),study_time_hours=student.study_time_hours,assessments=assessments,accuracy=round(latest.accuracy if latest else 0),reviews_due=sum(c.mastery<60 for c in concepts),chart=chart,mastery_breakdown=breakdown)

@router.get('/resources', response_model=ResourcesResponse)
def resources(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    return ResourcesResponse(items=db.query(Resource).filter(Resource.student_id==student.id).order_by(Resource.created_at.desc()).all())

@router.post('/resources/upload', response_model=ResourceItem)
async def upload_resource(student: Student = Depends(student_dep), file: UploadFile = File(...), db: Session = Depends(get_db)):
    ext=Path(file.filename or '').suffix.lower(); allowed={'.pdf': 'PDF','.docx':'DOCX','.txt':'TXT','.md':'MARKDOWN'}
    if ext not in allowed: raise HTTPException(400, 'Supported files: PDF, DOCX, TXT, Markdown')
    data=await file.read()
    if len(data)>50*1024*1024: raise HTTPException(413,'File exceeds 50 MB')
    target=UPLOAD_DIR / f'{student.id}_{uuid.uuid4().hex}{ext}'; target.write_bytes(data)
    text=''
    if ext in {'.txt','.md'}: text=data.decode('utf-8',errors='ignore')
    elif ext=='.pdf':
        try:
            from pypdf import PdfReader
            text='\n'.join((p.extract_text() or '') for p in PdfReader(str(target)).pages)
        except Exception: text=''
    elif ext=='.docx':
        try:
            from docx import Document
            text='\n'.join(p.text for p in Document(str(target)).paragraphs)
        except Exception: text=''
    resource=Resource(student_id=student.id,title=file.filename or target.name,type=allowed[ext],meta=f'{len(data)/1024:.0f} KB · processed',status='Ready',url=str(target))
    db.add(resource); db.commit(); db.refresh(resource)
    if text:
        build_concepts(db,student,text)
        update_student_progress(db,student); recompute_roadmap(db,student)
    return resource

@router.get('/learning/{concept_key}', response_model=LearningResponse)
def learning(concept_key: str, student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    concept=db.query(Concept).filter(Concept.student_id==student.id, Concept.concept_key==concept_key).first()
    if not concept: raise HTTPException(404,'Concept not found')
    session=db.query(LearningSession).filter(LearningSession.student_id==student.id,LearningSession.concept_id==concept.id).order_by(LearningSession.created_at.desc()).first()
    if not session:
        session=LearningSession(student_id=student.id,concept_id=concept.id,section='Core idea',summary=concept.description or f'Build an understanding of {concept.name}.',examples=[],why_it_matters=f'Current mastery is {concept.mastery:.0f}%. This concept sits in your adaptive path based on its prerequisites and target.',session_progress_current=1,session_progress_total=2,session_insight='The next assessment will update this concept\'s mastery.')
        db.add(session); db.commit(); db.refresh(session)
    prereqs=[ConceptResponse(id=p.id,concept_key=p.concept_key,name=p.name,mastery=p.mastery,status=p.status,difficulty=p.difficulty,x=p.x,y=p.y,description=p.description,prerequisites=[],created_at=p.created_at,updated_at=p.updated_at) for p in concept.prerequisites]
    c=ConceptResponse(id=concept.id,concept_key=concept.concept_key,name=concept.name,mastery=concept.mastery,status=concept.status,difficulty=concept.difficulty,x=concept.x,y=concept.y,description=concept.description,prerequisites=prereqs,created_at=concept.created_at,updated_at=concept.updated_at)
    return LearningResponse(concept=c,learning=LearningContent(concept_id=concept.concept_key,title=concept.name,section=session.section or 'Core idea',summary=session.summary or '',examples=session.examples or [],why_it_matters=session.why_it_matters or '',session_progress={'current':session.session_progress_current,'total':session.session_progress_total},session_insight=session.session_insight or ''))

@router.get('/assessment', response_model=AssessmentResponseSchema)
def assessment(student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    a=db.query(Assessment).filter(Assessment.student_id==student.id).order_by(Assessment.created_at.desc()).first() or create_diagnostic(db,student)
    return AssessmentResponseSchema(id=str(a.id),title=a.title,questions=[AssessmentQuestionSchema(id=str(q.id),question=q.question,options=q.options) for q in sorted(a.questions,key=lambda q:q.order_index)],result={'new_mastery':a.result.new_mastery,'delta':a.result.delta,'summary':a.result.summary} if a.result else None)

@router.post('/assessment/{assessment_id}/submit', response_model=AssessmentResponseSchema)
def submit(assessment_id: str, payload: AssessmentSubmit, student: Student = Depends(student_dep), db: Session = Depends(get_db)):
    try: aid=uuid.UUID(assessment_id)
    except ValueError: raise HTTPException(400,'Invalid assessment id')
    a=db.query(Assessment).filter(Assessment.id==aid,Assessment.student_id==student.id).first()
    if not a: raise HTTPException(404,'Assessment not found')
    result=submit_assessment(db,a,payload.answers); a=result['assessment']
    return AssessmentResponseSchema(id=str(a.id),title=a.title,questions=[AssessmentQuestionSchema(id=str(q.id),question=q.question,options=q.options) for q in sorted(a.questions,key=lambda q:q.order_index)],result={'new_mastery':result['result'].new_mastery,'delta':result['result'].delta,'summary':result['result'].summary})
