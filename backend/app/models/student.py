from sqlalchemy import Column, String, Integer, Float, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
import uuid

from app.database import Base



class Student(Base):
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    name = Column(String(255), nullable=False)
    goal = Column(String(500), nullable=True)
    subject = Column(String(255), nullable=True)
    plan_days = Column(Integer, default=30)
    study_hours_per_day = Column(Float, default=1.5)
    target_proficiency = Column(Integer, default=3)
    study_days = Column(String(50), default="0,1,2,3,4")
    current_streak_days = Column(Integer, default=0)
    overall_mastery = Column(Float, default=0.0)
    concepts_mastered = Column(Integer, default=0)
    total_concepts = Column(Integer, default=0)
    study_time_hours = Column(Float, default=0.0)
    study_time_planned_hours = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())