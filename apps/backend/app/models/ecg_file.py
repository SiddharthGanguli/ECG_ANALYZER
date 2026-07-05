from datetime import datetime

from sqlalchemy import (
    Integer,
    String,
    DateTime,
    ForeignKey,
    BigInteger,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.database import Base


class ECGFile(Base):
    __tablename__ = "ecg_files"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    uploaded_by: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    file_type: Mapped[str] = mapped_column(
        String(10),
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    file_size: Mapped[int | None] = mapped_column(
        BigInteger,
        nullable=True
    )

    upload_status: Mapped[str] = mapped_column(
        String(20),
        default="uploaded"
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationships
    patient = relationship(
        "User",
        foreign_keys=[patient_id],
        back_populates="ecg_files"
    )

    uploader = relationship(
        "User",
        foreign_keys=[uploaded_by],
        back_populates="uploaded_files"
    )

    prediction = relationship(
        "ECGPrediction",
        back_populates="ecg_file",
        uselist=False,
        cascade="all, delete-orphan"
    )