from datetime import date, datetime

from sqlalchemy import (
    Integer,
    String,
    Date,
    Numeric,
    DateTime,
    ForeignKey,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class PatientProfile(Base):
    __tablename__ = "patient_profiles"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )
    patient_name: Mapped[str | None] = mapped_column(
    String(100),
    nullable=True
)

    date_of_birth: Mapped[date | None] = mapped_column(
        Date,
        nullable=True
    )

    gender: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    blood_group: Mapped[str | None] = mapped_column(
        String(5),
        nullable=True
    )

    height: Mapped[float | None] = mapped_column(
        Numeric(5, 2),
        nullable=True
    )

    weight: Mapped[float | None] = mapped_column(
        Numeric(5, 2),
        nullable=True
    )

    emergency_contact: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationship
    user = relationship("User", back_populates="patient_profile")