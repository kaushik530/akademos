from datetime import datetime
from typing import Optional, List
import uuid
from pydantic import BaseModel, ConfigDict, Field

class StudentCreate(BaseModel):
    name: str = "Learner"
    goal: Optional[str] = None
    subject: Optional[str] = None
    plan_days: int = Field(default=30, ge=1, le=365)
    study_hours_per_day: float = Field(default=1.5, gt=0, le=24)
    study_days: List[int] = Field(default_factory=lambda: [0,1,2,3,4])
    target_proficiency: int = Field(default=3, ge=1, le=5)

class StudentUpdate(StudentCreate):
    pass
class StudentResponse(StudentCreate):
    id: uuid.UUID
    current_streak_days: int
    target_proficiency: int
    study_days: str
    overall_mastery: float
    concepts_mastered: int
    total_concepts: int
    study_time_hours: float
    study_time_planned_hours: float
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class OnboardingCreate(StudentCreate):
    pass
class OnboardingResponse(BaseModel):
    student_id: uuid.UUID
    assessment_id: uuid.UUID
    concepts: int

class ConceptResponse(BaseModel):
    id: uuid.UUID
    concept_key: str
    name: str
    mastery: float
    status: str
    difficulty: float
    x: int
    y: int
    description: Optional[str] = None
    prerequisites: List["ConceptResponse"] = []
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
class GraphEdge(BaseModel): source: str; target: str
class GraphLegend(BaseModel): label: str; tone: str
class KnowledgeGraphResponse(BaseModel): concepts: List[ConceptResponse]; edges: List[GraphEdge]; legend: List[GraphLegend]

class RoadmapItemResponse(BaseModel):
    id: uuid.UUID; student_id: uuid.UUID; title: str; meta: Optional[str]; mastery: float; status: str; time: Optional[str]; description: Optional[str]; order_index: int; concept_id: Optional[uuid.UUID]; created_at: datetime; updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
class RoadmapSummary(BaseModel): title: str; subtitle: str; concept_count: int; study_hours: str; updated: str
class RoadmapResponse(BaseModel): summary: RoadmapSummary; items: List[RoadmapItemResponse]

class DashboardMetric(BaseModel): label: str; value: str; subtext: str; type: str
class NextConcept(BaseModel): id: str; title: str; summary: str; mastery: int; time: str; path: str
class ScheduleItem(BaseModel): day: str; date: str; status: str
class DashboardResponse(BaseModel): title: str; subtitle: str; metrics: List[DashboardMetric]; next_concept: Optional[NextConcept]; schedule: List[ScheduleItem]

class ProgressChartPoint(BaseModel): day: str; value: int
class MasteryBreakdownResponse(BaseModel): id: uuid.UUID; student_id: uuid.UUID; concept_id: uuid.UUID; name: str; value: float; snapshot_date: datetime; created_at: datetime; model_config = ConfigDict(from_attributes=True)
class ProgressResponse(BaseModel): overall_mastery: int; study_time_hours: float; assessments: int; accuracy: int; reviews_due: int; chart: List[ProgressChartPoint]; mastery_breakdown: List[MasteryBreakdownResponse]

class ResourceItem(BaseModel): id: uuid.UUID; title: str; type: str; meta: str; status: str; url: Optional[str] = None
class ResourcesResponse(BaseModel): items: List[ResourceItem]

class LearningContent(BaseModel): concept_id: str; title: str; section: str; summary: str; examples: List[dict]; why_it_matters: str; session_progress: dict; session_insight: str
class LearningResponse(BaseModel): concept: ConceptResponse; learning: LearningContent

class AssessmentQuestionSchema(BaseModel): id: str; question: str; options: List[str]
class AssessmentResponseSchema(BaseModel): id: str; title: str; questions: List[AssessmentQuestionSchema]; result: Optional[dict] = None
class AssessmentSubmit(BaseModel): answers: List[int]



# -------------------------
# Authentication Schemas
# -------------------------

class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=8, max_length=72)


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=255)
    password: str = Field(..., min_length=1, max_length=72)


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse