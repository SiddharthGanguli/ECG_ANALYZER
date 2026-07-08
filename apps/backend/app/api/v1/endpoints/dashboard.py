from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.dashboard_service import dashboard_stats

router = APIRouter(
    tags=["Dashboard"],
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
):
    return dashboard_stats(db)