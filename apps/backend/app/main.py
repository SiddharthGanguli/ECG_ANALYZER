from fastapi import FastAPI
from app.api.v1.endpoints.users import router as user_router
from app.database.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
# Import models so SQLAlchemy knows about them
from app.models import *

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ECG AI Analyzer API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)
@app.get("/")
def root():
    return {
        "message": "ECG AI Backend Running Successfully "
    }