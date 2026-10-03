from sqlalchemy import Column, String, Integer, Float, Text, ForeignKey, Table, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


# Association table for concept prerequisites (many-to-many self-referential)
concept_prerequisites = Table(
    "concept_prerequisites",
    Base.metadata,
    Column("concept_id", UUID(as_uuid=True), ForeignKey("concepts.id"), primary_key=True),
    Column("prerequisite_id", UUID(as_uuid=True), ForeignKey("concepts.id"), primary_key=True),
)


class Concept(Base):
    __tablename__ = "concepts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=True, index=True)
    concept_key = Column(String(100), unique=True, nullable=False, index=True)  # e.g., "sql", "fd", "normalization"
    name = Column(String(255), nullable=False)
    mastery = Column(Float, default=0.0)
    status = Column(String(50), default="locked")  # mastered, learning, weak, locked
    difficulty = Column(Float, default=0.5)
    x = Column(Integer, default=0)
    y = Column(Integer, default=0)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Self-referential many-to-many for prerequisites
    prerequisites = relationship(
        "Concept",
        secondary=concept_prerequisites,
        primaryjoin=id == concept_prerequisites.c.concept_id,
        secondaryjoin=id == concept_prerequisites.c.prerequisite_id,
        backref="dependents",
    )