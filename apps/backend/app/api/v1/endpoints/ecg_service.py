from sqlalchemy.orm import Session

from app.crud.ecg_file import (
    create_ecg_file,
    get_ecg_file,
    get_patient_ecg_files,
    delete_ecg_file,
)

from app.schemas.ecg_file import ECGFileCreate


def create_file(
    db: Session,
    ecg_file: ECGFileCreate,
):
    return create_ecg_file(db, ecg_file)


def get_file(
    db: Session,
    file_id: int,
):
    return get_ecg_file(db, file_id)


def get_patient_files(
    db: Session,
    patient_id: int,
):
    return get_patient_ecg_files(
        db,
        patient_id,
    )


def delete_file(
    db: Session,
    file_id: int,
):
    return delete_ecg_file(
        db,
        file_id,
    )