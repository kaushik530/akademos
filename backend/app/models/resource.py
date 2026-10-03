from sqlalchemy import Column, String, Integer, Text, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid

from app.database import Base


class Resource(Base):
    __tablename__ = "resources"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id"), nullable=False)
    title = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  # PDF, BOOK, SLIDES, VIDEO, etc.
    meta = Column(String(255), nullable=True)
    status = Column(String(50), default="Ready")  # Ready, Processing, Error
    url = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    student = relationship("Student", backref="resources")