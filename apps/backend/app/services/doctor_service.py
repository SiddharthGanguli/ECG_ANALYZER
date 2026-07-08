from sqlalchemy.orm import Session

from app.crud.doctor_profile import (
    create_doctor_profile,
    get_doctor_profile,
    update_doctor_profile,
)

from app.schemas.doctor_profile import (
    DoctorProfileCreate,
    DoctorProfileUpdate,
)


def create_profile(
    db: Session,
    profile: DoctorProfileCreate
):
    existing = get_doctor_profile(db, profile.user_id)

    if existing:
        return existing

    return create_doctor_profile(db, profile)


def get_profile(
    db: Session,
    user_id: int
):
    return get_doctor_profile(db, user_id)


def update_profile(
    db: Session,
    user_id: int,
    profile: DoctorProfileUpdate
):
    return update_doctor_profile(
        db,
        user_id,
        profile,
    )