from pydantic import BaseModel, EmailStr
from typing import Literal


class UserCreate(BaseModel):
    firebase_uid: str
    role: Literal["doctor", "patient"]
    full_name: str
    email: EmailStr
    phone: str | None = None


class UserUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None


class UserResponse(UserCreate):
    id: int

    class Config:
        from_attributes = True