from datetime import datetime

from pydantic import BaseModel


class ECGPredictionBase(BaseModel):
    predicted_class: str
    class_id: int
    confidence: float
    model_version: str | None = None
    processing_time_ms: int | None = None
    status: str = "completed"


class ECGPredictionCreate(ECGPredictionBase):
    ecg_file_id: int
    patient_id: int


class ECGPredictionResponse(ECGPredictionBase):
    id: int
    ecg_file_id: int
    patient_id: int
    prediction_time: datetime

    class Config:
        from_attributes = True