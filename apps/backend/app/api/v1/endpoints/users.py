from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.user_service import create_user, get_user_by_uid
from app.database.database import get_db
from app.schemas.user import UserCreate
from app.services.user_service import create_user

router = APIRouter()


@router.post("/")
def add_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(db, user)

@router.get("/{firebase_uid}")
def get_user(
    firebase_uid: str,
    db: Session = Depends(get_db)
):
    return get_user_by_uid(db, firebase_uid)