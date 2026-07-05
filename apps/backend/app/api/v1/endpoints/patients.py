from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.patient_profile import (
    PatientProfileCreate,
    PatientProfileUpdate,
    PatientProfileResponse,
)

from app.services.patient_service import (
    create_profile,
    get_profile,
    update_profile,
)

router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post(
    "/profile",
    response_model=PatientProfileResponse,
)
def create_patient(
    profile: PatientProfileCreate,
    db: Session = Depends(get_db),
):
    return create_profile(db, profile)


@router.get(
    "/profile/{user_id}",
    response_model=PatientProfileResponse,
)
def get_patient(
    user_id: int,
    db: Session = Depends(get_db),
):
    patient = get_profile(db, user_id)

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found",
        )

    return patient


@router.put(
    "/profile/{user_id}",
    response_model=PatientProfileResponse,
)
def update_patient(
    user_id: int,
    profile: PatientProfileUpdate,
    db: Session = Depends(get_db),
):
    patient = update_profile(
        db,
        user_id,
        profile,
    )

    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient profile not found",
        )

    return patient