from sqlalchemy.orm import Session

from app.models.ecg_file import ECGFile
from app.schemas.ecg_file import (
    ECGFileCreate,
)


def create_ecg_file(
    db: Session,
    ecg_file: ECGFileCreate
) -> ECGFile:

    db_file = ECGFile(
        patient_id=ecg_file.patient_id,
        uploaded_by=ecg_file.uploaded_by,
        file_name=ecg_file.file_name,
        file_type=ecg_file.file_type,
        file_path=ecg_file.file_path,
        file_size=ecg_file.file_size,
        upload_status=ecg_file.upload_status,
    )

    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    return db_file


def get_ecg_file(
    db: Session,
    file_id: int
):
    return (
        db.query(ECGFile)
        .filter(ECGFile.id == file_id)
        .first()
    )


def get_patient_ecg_files(
    db: Session,
    patient_id: int
):
    return (
        db.query(ECGFile)
        .filter(ECGFile.patient_id == patient_id)
        .all()
    )


def update_upload_status(
    db: Session,
    file_id: int,
    status: str
):
    ecg_file = get_ecg_file(db, file_id)

    if not ecg_file:
        return None

    ecg_file.upload_status = status

    db.commit()
    db.refresh(ecg_file)

    return ecg_file


def delete_ecg_file(
    db: Session,
    file_id: int
):
    ecg_file = get_ecg_file(db, file_id)

    if not ecg_file:
        return None

    db.delete(ecg_file)
    db.commit()

    return ecg_file