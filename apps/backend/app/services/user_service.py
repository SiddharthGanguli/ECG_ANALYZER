from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


def create_user(db: Session, user: UserCreate):

    db_user = User(
        firebase_uid=user.firebase_uid,
        role=user.role,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def get_user_by_uid(db: Session, firebase_uid: str):
    return (
        db.query(User)
        .filter(User.firebase_uid == firebase_uid)
        .first()
    )