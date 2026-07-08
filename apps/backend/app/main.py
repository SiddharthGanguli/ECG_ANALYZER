from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base

# Import all models
from app.models import *

# Import routers
from app.api.v1.endpoints.users import router as user_router
from app.api.v1.endpoints.patients import router as patient_router
from app.api.v1.endpoints.doctors import router as doctor_router
from app.api.v1.endpoints.ecg import router as ecg_router
from app.api.v1.endpoints.dashboard import router as dashboard_router


# ==========================================
# Create Database Tables
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="ECG AI Analyzer API",
    version="1.0.0",
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Register Routers
# ==========================================

app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"],
)

app.include_router(
    patient_router,
    prefix="/patients",
    tags=["Patients"],
)

app.include_router(
    doctor_router,
    prefix="/doctors",
    tags=["Doctors"],
)

app.include_router(
    ecg_router,
    prefix="/ecg",
    tags=["ECG"],
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"],
)


# ==========================================
# Root Endpoint
# ==========================================

@app.get("/")
def root():
    return {
        "message": "ECG AI Backend Running Successfully"
    }