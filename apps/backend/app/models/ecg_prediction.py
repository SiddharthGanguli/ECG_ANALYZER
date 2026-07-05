from datetime import datetime

from sqlalchemy import (
    Integer,
    String,
    DateTime,
    ForeignKey,
    Numeric,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class ECGPrediction(Base):
    __tablename__ = "ecg_predictions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    ecg_file_id: Mapped[int] = mapped_column(
        ForeignKey("ecg_files.id", ondelete="CASCADE"),
        nullable=False
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    predicted_class: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    class_id: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    confidence: Mapped[float] = mapped_column(
        Numeric(5, 2),
        nullable=False
    )

    model_version: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True
    )

    processing_time_ms: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="completed"
    )

    prediction_time: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationships
    ecg_file = relationship(
        "ECGFile",
        back_populates="prediction"
    )
    patient = relationship(
        "User",
        back_populates="predictions"
    )