from pydantic import BaseModel


class DoctorProfileBase(BaseModel):
    specialization: str | None = None
    hospital: str | None = None
    license_number: str | None = None
    experience_years: int | None = None


class DoctorProfileCreate(DoctorProfileBase):
    user_id: int


class DoctorProfileUpdate(DoctorProfileBase):
    pass


class DoctorProfileResponse(DoctorProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True