from sqlalchemy.orm import Session

from app.models.doctor_profile import DoctorProfile
from app.schemas.doctor_profile import (
    DoctorProfileCreate,
    DoctorProfileUpdate,
)


def create_doctor_profile(
    db: Session,
    profile: DoctorProfileCreate
) -> DoctorProfile:

    db_profile = DoctorProfile(
        user_id=profile.user_id,
        specialization=profile.specialization,
        hospital=profile.hospital,
        license_number=profile.license_number,
        experience_years=profile.experience_years,
    )

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile


def get_doctor_profile(
    db: Session,
    user_id: int
):
    return (
        db.query(DoctorProfile)
        .filter(DoctorProfile.user_id == user_id)
        .first()
    )


def update_doctor_profile(
    db: Session,
    user_id: int,
    profile_update: DoctorProfileUpdate
):

    profile = get_doctor_profile(db, user_id)

    if not profile:
        return None

    update_data = profile_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile


def delete_doctor_profile(
    db: Session,
    user_id: int
):

    profile = get_doctor_profile(db, user_id)

    if not profile:
        return None

    db.delete(profile)
    db.commit()

    return profile