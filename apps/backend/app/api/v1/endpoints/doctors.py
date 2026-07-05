from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.doctor_profile import (
    DoctorProfileCreate,
    DoctorProfileUpdate,
    DoctorProfileResponse,
)

from app.services.doctor_service import (
    create_profile,
    get_profile,
    update_profile,
)

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)


@router.post(
    "/profile",
    response_model=DoctorProfileResponse,
)
def create_doctor(
    profile: DoctorProfileCreate,
    db: Session = Depends(get_db),
):
    return create_profile(db, profile)


@router.get(
    "/profile/{user_id}",
    response_model=DoctorProfileResponse,
)
def get_doctor(
    user_id: int,
    db: Session = Depends(get_db),
):
    doctor = get_profile(db, user_id)

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found",
        )

    return doctor


@router.put(
    "/profile/{user_id}",
    response_model=DoctorProfileResponse,
)
def update_doctor(
    user_id: int,
    profile: DoctorProfileUpdate,
    db: Session = Depends(get_db),
):
    doctor = update_profile(
        db,
        user_id,
        profile,
    )

    if not doctor:
        raise HTTPException(
            status_code=404,
            detail="Doctor profile not found",
        )

    return doctor