from pathlib import Path
from uuid import uuid4
import shutil

from fastapi import UploadFile

UPLOAD_DIR = Path("uploads")


def save_ecg_file(file: UploadFile, patient_id: int):
    """
    Save uploaded ECG file (.csv, .dat, .hea)
    """

    patient_folder = UPLOAD_DIR / str(patient_id)
    patient_folder.mkdir(parents=True, exist_ok=True)

    extension = Path(file.filename).suffix.lower()

    filename = f"{uuid4()}{extension}"

    file_path = patient_folder / filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "file_name": file.filename,
        "stored_name": filename,
        "file_path": str(file_path),
        "file_size": file_path.stat().st_size,
        "file_type": extension.replace(".", "")
    }

ALLOWED_EXTENSIONS = {
    "csv",
    "dat",
    "hea"
}


def validate_file(file: UploadFile):

    extension = Path(file.filename).suffix.lower().replace(".", "")

    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(
            f"Unsupported file type: {extension}"
        )

    return extension