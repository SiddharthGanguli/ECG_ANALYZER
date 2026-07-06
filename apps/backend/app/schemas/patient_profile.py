from datetime import date, datetime
from pydantic import BaseModel


class PatientProfileBase(BaseModel):

    patient_name: str | None = None
    date_of_birth: date | None = None
    gender: str | None = None
    blood_group: str | None = None
    height: float | None = None
    weight: float | None = None
    emergency_contact: str | None = None


class PatientProfileCreate(PatientProfileBase):
    user_id: int


class PatientProfileUpdate(PatientProfileBase):
    pass


class PatientProfileResponse(PatientProfileBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True