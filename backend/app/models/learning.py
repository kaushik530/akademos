from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


class LearningSession(Base):
    __tablename__ = "learning_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=False)
    section = Column(String(255), nullable=True)
    summary = Column(Text, nullable=True)
    examples = Column(JSON, nullable=True)  # List of example objects
    why_it_matters = Column(Text, nullable=True)
    session_progress_current = Column(Integer, default=1)
    session_progress_total = Column(Integer, default=1)
    session_insight = Column(Text, nullable=True)
    status = Column(String(50), default="in_progress")  # in_progress, completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    student = relationship("Student", backref="learning_sessions")
    concept = relationship("Concept", backref="learning_sessions")