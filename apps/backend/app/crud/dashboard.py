from collections import Counter
from datetime import datetime, timedelta

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.patient_profile import PatientProfile
from app.models.ecg_file import ECGFile
from app.models.ecg_prediction import ECGPrediction


def get_dashboard_stats(db: Session):

    # =====================================
    # Stats
    # =====================================

    total_patients = db.query(
        func.count(PatientProfile.id)
    ).scalar()

    total_ecgs = db.query(
        func.count(ECGFile.id)
    ).scalar()

    critical_cases = (
        db.query(func.count(ECGPrediction.id))
        .filter(
            ECGPrediction.predicted_class != "Normal Beat (N)"
        )
        .scalar()
    )

    average_accuracy = (
        db.query(func.avg(ECGPrediction.confidence))
        .scalar()
    )

    # =====================================
    # Recent Patients
    # =====================================

    recent_patients = (

        db.query(
            PatientProfile.user_id,
            PatientProfile.patient_name,
            PatientProfile.created_at,
            ECGPrediction.predicted_class,
            ECGPrediction.confidence,
        )

        .outerjoin(
            ECGPrediction,
            PatientProfile.user_id == ECGPrediction.patient_id,
        )

        .order_by(
            PatientProfile.created_at.desc()
        )

        .limit(10)

        .all()

    )

    patients = []

    for p in recent_patients:

        risk = (
            "Low Risk"
            if p.predicted_class == "Normal Beat (N)"
            else "High Risk"
        )

        patients.append({

            "user_id": p.user_id,

            "patient_name": p.patient_name,

            "created_at": p.created_at,

            "condition": p.predicted_class or "--",

            "risk": risk if p.predicted_class else "--",

            "confidence": float(p.confidence) if p.confidence else "--",

        })

    # =====================================
    # Weekly Analysis
    # =====================================

    week_days = []

    today = datetime.utcnow().date()

    for i in range(6, -1, -1):

        d = today - timedelta(days=i)

        normal = (
            db.query(func.count(ECGPrediction.id))
            .filter(
                func.date(ECGPrediction.prediction_time) == d,
                ECGPrediction.predicted_class == "Normal Beat (N)"
            )
            .scalar()
        )

        abnormal = (
            db.query(func.count(ECGPrediction.id))
            .filter(
                func.date(ECGPrediction.prediction_time) == d,
                ECGPrediction.predicted_class != "Normal Beat (N)"
            )
            .scalar()
        )

        week_days.append({

            "day": d.strftime("%a"),

            "normal": normal or 0,

            "abnormal": abnormal or 0,

        })

    # =====================================
    # Condition Distribution
    # =====================================

    predictions = db.query(
        ECGPrediction.predicted_class
    ).all()

    counts = Counter(
        [p.predicted_class for p in predictions]
    )

    colors = {

        "Normal Beat (N)": "#10b981",

        "Supraventricular Beat (S)": "#2563eb",

        "Ventricular Beat (V)": "#ef4444",

        "Fusion Beat (F)": "#f59e0b",

        "Unknown Beat (Q)": "#8b5cf6",

    }

    conditions = []

    total = sum(counts.values())

    for label, count in counts.items():

        percentage = 0

        if total > 0:

            percentage = round(
                count * 100 / total,
                1,
            )

        conditions.append({

            "name": label,

            "value": percentage,

            "color": colors.get(
                label,
                "#94a3b8",
            ),

        })

    # =====================================
    # Return
    # =====================================

    return {

        "stats": {

            "patients": total_patients or 0,

            "ecgs": total_ecgs or 0,

            "critical_cases": critical_cases or 0,

            "ai_accuracy": round(
                float(average_accuracy or 0),
                2,
            ),

        },

        "recentPatients": patients,

        "weekly": week_days,

        "conditions": conditions,

    }