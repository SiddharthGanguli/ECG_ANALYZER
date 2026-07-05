from sqlalchemy.orm import Session

from app.models.ecg_prediction import ECGPrediction
from app.schemas.ecg_prediction import (
    ECGPredictionCreate,
)


def create_prediction(
    db: Session,
    prediction: ECGPredictionCreate
) -> ECGPrediction:

    db_prediction = ECGPrediction(
        ecg_file_id=prediction.ecg_file_id,
        patient_id=prediction.patient_id,
        predicted_class=prediction.predicted_class,
        class_id=prediction.class_id,
        confidence=prediction.confidence,
        model_version=prediction.model_version,
        processing_time_ms=prediction.processing_time_ms,
        status=prediction.status,
    )

    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return db_prediction


def get_prediction(
    db: Session,
    prediction_id: int
):
    return (
        db.query(ECGPrediction)
        .filter(ECGPrediction.id == prediction_id)
        .first()
    )


def get_prediction_by_file(
    db: Session,
    file_id: int
):
    return (
        db.query(ECGPrediction)
        .filter(ECGPrediction.ecg_file_id == file_id)
        .first()
    )


def get_patient_predictions(
    db: Session,
    patient_id: int
):
    return (
        db.query(ECGPrediction)
        .filter(ECGPrediction.patient_id == patient_id)
        .all()
    )


def delete_prediction(
    db: Session,
    prediction_id: int
):
    prediction = get_prediction(db, prediction_id)

    if not prediction:
        return None

    db.delete(prediction)
    db.commit()

    return prediction