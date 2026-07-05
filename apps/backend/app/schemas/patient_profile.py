from datetime import date
from pydantic import BaseModel


class PatientProfileBase(BaseModel):
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

    class Config:
        from_attributes = True