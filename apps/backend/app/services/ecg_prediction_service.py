from sqlalchemy.orm import Session

from app.schemas.ecg_prediction import ECGPredictionCreate
from app.crud.ecg_prediction import create_prediction


def save_prediction(
    db: Session,
    ecg_file_id: int,
    patient_id: int,
    predicted_class: str,
    class_id: int,
    confidence: float,
    processing_time_ms: int,
):
    prediction = ECGPredictionCreate(
        ecg_file_id=ecg_file_id,
        patient_id=patient_id,
        predicted_class=predicted_class,
        class_id=class_id,
        confidence=confidence,
        model_version="CNN-LSTM-v1",
        processing_time_ms=int(processing_time_ms),
        status="completed",
    )

    return create_prediction(
        db=db,
        prediction=prediction,
    )