from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


class RoadmapItem(Base):
    __tablename__ = "roadmap_items"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    meta = Column(String(255), nullable=True)
    mastery = Column(Float, default=0.0)
    status = Column(String(50), default="upcoming")  # current, upcoming, completed
    time = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    order_index = Column(Integer, default=0)
    concept_id = Column(UUID(as_uuid=True), ForeignKey("concepts.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    student = relationship("Student", backref="roadmap_items")
    concept = relationship("Concept", backref="roadmap_items")