from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


class ProgressSnapshot(Base):
    __tablename__ = "progress_snapshots"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    overall_mastery = Column(Float, default=0.0)
    study_time_hours = Column(Float, default=0.0)
    assessments = Column(Integer, default=0)
    accuracy = Column(Float, default=0.0)
    reviews_due = Column(Integer, default=0)
    snapshot_date = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", backref="progress_snapshots")


class MasteryBreakdown(Base):
    __tablename__ = "mastery_breakdowns"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=False)
    name = Column(String(255), nullable=False)
    value = Column(Float, default=0.0)
    snapshot_date = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", backref="mastery_breakdowns")
    concept = relationship("Concept", backref="mastery_breakdowns")