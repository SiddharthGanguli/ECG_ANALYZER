from sqlalchemy.orm import Session

from app.crud.user import (
    create_user as crud_create_user,
    get_user_by_firebase_uid,
)

from app.schemas.user import UserCreate


def create_user(db: Session, user: UserCreate):
    """
    Business logic before creating a user.
    """

    existing_user = get_user_by_firebase_uid(
        db,
        user.firebase_uid
    )

    if existing_user:
        return existing_user

    return crud_create_user(db, user)


def get_user_by_uid(
    db: Session,
    firebase_uid: str
):
    return get_user_by_firebase_uid(
        db,
        firebase_uid
    )