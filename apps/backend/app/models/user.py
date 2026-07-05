from datetime import datetime

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    firebase_uid: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    role: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False
    )

    phone: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # ---------------- Relationships ---------------- #

    patient_profile = relationship(
        "PatientProfile",
        back_populates="user",
        uselist=False
    )

    doctor_profile = relationship(
        "DoctorProfile",
        back_populates="user",
        uselist=False
    )

    ecg_files = relationship(
        "ECGFile",
        foreign_keys="ECGFile.patient_id",
        back_populates="patient"
    )

    uploaded_files = relationship(
        "ECGFile",
        foreign_keys="ECGFile.uploaded_by",
        back_populates="uploader"
    )

    predictions = relationship(
        "ECGPrediction",
        back_populates="patient"
    )