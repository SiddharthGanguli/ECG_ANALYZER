from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def create_user(db: Session, user: UserCreate) -> User:
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


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_firebase_uid(db: Session, firebase_uid: str):
    return (
        db.query(User)
        .filter(User.firebase_uid == firebase_uid)
        .first()
    )


def get_all_users(db: Session):
    return db.query(User).all()


def update_user(
    db: Session,
    user_id: int,
    user_update: UserUpdate
):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    update_data = user_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)

    return user


def delete_user(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)

    if not user:
        return None

    db.delete(user)
    db.commit()

    return user