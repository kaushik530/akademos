from sqlalchemy import (
    Column,
    BigInteger,
    String,
    Text,
    DateTime,
    UniqueConstraint,
)
from sqlalchemy.sql import func

from app.database import Base


class User(Base):

    __tablename__ = "users"

    __table_args__ = (
        UniqueConstraint(
            "email",
            name="users_email_key"
        ),
    )

    id = Column(
        BigInteger,
        primary_key=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        nullable=False
    )

    password_hash = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )