from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.services.supabase_storage import upload_ecg_file

ALLOWED_EXTENSIONS = {
    "csv"
}


def validate_file(file: UploadFile):
    """
    Validate uploaded ECG file.
    Currently only CSV is supported.
    """

    extension = Path(file.filename).suffix.lower().replace(".", "")

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(
            "Only CSV files are supported."
        )

    return extension


def save_ecg_file(
    file: UploadFile,
    patient_id: int,
):
    """
    Upload ECG CSV to Supabase Storage.
    """

    extension = validate_file(file)

    unique_filename = f"{uuid4()}.{extension}"

    storage_path = (
        f"patient_{patient_id}/{unique_filename}"
    )

    file_bytes = file.file.read()
    file.file.seek(0)

    upload_ecg_file(
        file_bytes=file_bytes,
        destination_path=storage_path,
    )

    return {
        "file_name": file.filename,
        "stored_name": unique_filename,
        "file_path": storage_path,
        "file_size": len(file_bytes),
        "file_type": extension,
    }