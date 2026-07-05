from sqlalchemy.orm import Session

from app.models.patient_profile import PatientProfile
from app.schemas.patient_profile import (
    PatientProfileCreate,
    PatientProfileUpdate,
)


def create_patient_profile(
    db: Session,
    profile: PatientProfileCreate
) -> PatientProfile:

    db_profile = PatientProfile(
        user_id=profile.user_id,
        date_of_birth=profile.date_of_birth,
        gender=profile.gender,
        blood_group=profile.blood_group,
        height=profile.height,
        weight=profile.weight,
        emergency_contact=profile.emergency_contact,
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile


def get_patient_profile(
    db: Session,
    user_id: int
):
    return (
        db.query(PatientProfile)
        .filter(PatientProfile.user_id == user_id)
        .first()
    )


def update_patient_profile(
    db: Session,
    user_id: int,
    profile_update: PatientProfileUpdate
):

    profile = get_patient_profile(db, user_id)

    if not profile:
        return None

    update_data = profile_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile


def delete_patient_profile(
    db: Session,
    user_id: int
):

    profile = get_patient_profile(db, user_id)

    if not profile:
        return None

    db.delete(profile)
    db.commit()

    return profile