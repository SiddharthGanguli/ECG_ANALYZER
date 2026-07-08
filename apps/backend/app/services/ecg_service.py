from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.schemas.ecg_file import ECGFileCreate

from app.crud.ecg_file import (
    create_ecg_file,
    get_ecg_file,
    get_patient_ecg_files,
    delete_ecg_file,
)

from app.services.storage_service import save_ecg_file
from app.services.ecg_prediction_service import save_prediction

import io
import time
import pandas as pd

from app.ml.preprocess import load_ecg_csv
from app.ml.predictor import predict_ecg


# ==========================================
# Upload ECG
# ==========================================

def upload_ecg(
    db: Session,
    patient_id: int,
    uploaded_by: int,
    file: UploadFile,
):
    """
    Upload ECG CSV
    Run AI Prediction
    Save ECG File
    Save Prediction
    """

    start_time = time.time()

    # ======================================
    # Save CSV to Supabase
    # ======================================

    file_info = save_ecg_file(
        file=file,
        patient_id=patient_id,
    )

    # ======================================
    # Reset Pointer
    # ======================================

    file.file.seek(0)

    # ======================================
    # Read CSV
    # ======================================

    dataframe = pd.read_csv(
        io.BytesIO(file.file.read()),
        header=None,
    )

    temp_path = "temp_prediction.csv"

    dataframe.to_csv(
        temp_path,
        index=False,
        header=False,
    )

    # ======================================
    # Preprocess
    # ======================================

    ecg_data = load_ecg_csv(
        temp_path,
    )

    # ======================================
    # AI Prediction
    # ======================================

    predictions = predict_ecg(
        ecg_data,
    )

    # ======================================
    # Save ECG File
    # ======================================

    ecg = ECGFileCreate(
        patient_id=patient_id,
        uploaded_by=uploaded_by,
        file_name=file_info["file_name"],
        file_type=file_info["file_type"],
        file_path=file_info["file_path"],
        file_size=file_info["file_size"],
        upload_status="uploaded",
    )

    saved_file = create_ecg_file(
        db=db,
        ecg_file=ecg,
    )

    # ======================================
    # Processing Time
    # ======================================

    processing_time = round(
        (time.time() - start_time) * 1000,
        2,
    )

    # ======================================
    # SAVE OVERALL PREDICTION
    # ======================================

    if len(predictions) > 0:

        overall_prediction = predictions[0]

        save_prediction(
            db=db,
            ecg_file_id=saved_file.id,
            patient_id=patient_id,
            predicted_class=overall_prediction["prediction"],
            class_id=overall_prediction["class_id"],
            confidence=float(
                overall_prediction["confidence"]
            ),
            processing_time_ms=int(processing_time),
        )

    # ======================================
    # Return Response
    # ======================================

    return {
        "ecg_file": saved_file,
        "processing_time_ms": processing_time,
        "beats": len(predictions),
        "results": predictions,
    }


# ==========================================
# Existing CRUD
# ==========================================

def create_file(
    db: Session,
    ecg_file: ECGFileCreate,
):
    return create_ecg_file(
        db,
        ecg_file,
    )


def get_file(
    db: Session,
    file_id: int,
):
    return get_ecg_file(
        db,
        file_id,
    )


def get_patient_files(
    db: Session,
    patient_id: int,
):
    return get_patient_ecg_files(
        db,
        patient_id,
    )


def delete_file(
    db: Session,
    file_id: int,
):
    return delete_ecg_file(
        db,
        file_id,
    )