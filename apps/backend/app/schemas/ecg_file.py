from datetime import datetime

from pydantic import BaseModel


class ECGFileBase(BaseModel):
    file_name: str
    file_type: str
    file_path: str
    file_size: int | None = None
    upload_status: str = "uploaded"


class ECGFileCreate(ECGFileBase):
    patient_id: int
    uploaded_by: int


class ECGFileResponse(ECGFileBase):
    id: int
    patient_id: int
    uploaded_by: int
    uploaded_at: datetime

    class Config:
        from_attributes = True