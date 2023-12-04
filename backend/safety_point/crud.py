from sqlalchemy.orm import Session

from . import models, schemas


def get_safety_point(db: Session, safety_point_id: int):
    return db.query(models.SafetyPoint).filter(models.SafetyPoint.id == safety_point_id).first()


def get_safety_points(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.SafetyPoint).offset(skip).limit(limit).all()


def create_safety_point(db: Session, safety_point: schemas.SafetyPoint):
    db_safety_point = models.SafetyPoint(
        name=safety_point.name,
        location=safety_point.location,
        coordinates=safety_point.coordinates
)
    db.add(db_safety_point)
    db.commit()
    db.refresh(db_safety_point)
    return db_safety_point
