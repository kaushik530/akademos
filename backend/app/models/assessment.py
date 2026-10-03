from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=True)
    status = Column(String(50), default="pending")  # pending, completed, in_progress
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    student = relationship("Student", backref="assessments")
    concept = relationship("Concept", backref="assessments")
    questions = relationship("AssessmentQuestion", backref="assessment", cascade="all, delete-orphan")
    result = relationship("AssessmentResult", backref="assessment", uselist=False, cascade="all, delete-orphan")


class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assessment_id = Column(UUID(as_uuid=True), ForeignKey("assessments.id"), nullable=False)
    question = Column(Text, nullable=False)
    options = Column(JSON, nullable=False)  # List of option strings
    answer_index = Column(Integer, nullable=False)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AssessmentResult(Base):
    __tablename__ = "assessment_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assessment_id = Column(UUID(as_uuid=True), ForeignKey("assessments.id"), nullable=False, unique=True)
    new_mastery = Column(Float, default=0.0)
    delta = Column(String(100), nullable=True)
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())