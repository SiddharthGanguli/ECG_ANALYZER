from sqlalchemy.orm import Session

from app.crud.patient_profile import (
    create_patient_profile,
    get_patient_profile,
    update_patient_profile,
    get_recent_patients,
)

from app.schemas.patient_profile import (
    PatientProfileCreate,
    PatientProfileUpdate,
)


def create_profile(
    db: Session,
    profile: PatientProfileCreate
):
    existing = get_patient_profile(db, profile.user_id)

    if existing:
        return existing

    return create_patient_profile(db, profile)


def get_profile(
    db: Session,
    user_id: int
):
    return get_patient_profile(db, user_id)


def update_profile(
    db: Session,
    user_id: int,
    profile: PatientProfileUpdate
):
    return update_patient_profile(
        db,
        user_id,
        profile,
    )
def get_recent_profiles(
    db: Session
):
    return get_recent_patients(db)