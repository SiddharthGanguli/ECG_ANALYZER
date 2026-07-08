from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
)

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.ecg_file import (
    ECGFileCreate,
    ECGFileResponse,
)

from app.services.ecg_service import (
    create_file,
    get_file,
    get_patient_files,
    delete_file,
    upload_ecg,
)

router = APIRouter(
    prefix="/ecg",
    tags=["ECG"],
)


# ==========================================
# Upload ECG CSV
# ==========================================

@router.post("/analyze")
async def analyze_ecg(
    patient_id: int = Form(...),
    uploaded_by: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """
    Upload ECG CSV to Supabase Storage
    and save metadata.
    """

    try:

        ecg = upload_ecg(
            db=db,
            patient_id=patient_id,
            uploaded_by=uploaded_by,
            file=file,
        )

        return {
            "message": "ECG uploaded successfully.",
            "ecg": ecg,
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# ==========================================
# Existing CRUD
# ==========================================

@router.post(
    "/",
    response_model=ECGFileResponse,
)
def create_ecg(
    ecg_file: ECGFileCreate,
    db: Session = Depends(get_db),
):
    return create_file(db, ecg_file)


@router.get(
    "/{file_id}",
    response_model=ECGFileResponse,
)
def get_ecg(
    file_id: int,
    db: Session = Depends(get_db),
):

    ecg = get_file(
        db,
        file_id,
    )

    if not ecg:

        raise HTTPException(
            status_code=404,
            detail="ECG file not found",
        )

    return ecg


@router.get(
    "/patient/{patient_id}",
    response_model=list[ECGFileResponse],
)
def get_patient_ecg(
    patient_id: int,
    db: Session = Depends(get_db),
):
    return get_patient_files(
        db,
        patient_id,
    )


@router.delete("/{file_id}")
def delete_ecg(
    file_id: int,
    db: Session = Depends(get_db),
):

    ecg = delete_file(
        db,
        file_id,
    )

    if not ecg:

        raise HTTPException(
            status_code=404,
            detail="ECG file not found",
        )

    return {
        "message": "ECG file deleted successfully"
    }