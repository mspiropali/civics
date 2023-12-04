from sqlalchemy.orm import Session

from . import models, schemas


def get_emergency_event(db: Session, emergency_event_id: int):
    return db.query(models.EmergencyEvent).filter(models.EmergencyEvent.id == emergency_event_id).first()


def get_emergency_events(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.EmergencyEvent).offset(skip).limit(limit).all()


def create_emergency_event(db: Session, emergency_event: schemas.EmergencyEvent):
    db_emergency_event = models.EmergencyEvent(
        name=emergency_event.name, 
        type=emergency_event.type,
        location=emergency_event.location,
        coordinates=emergency_event.coordinates,
        severity=emergency_event.severity        
        )
    db.add(db_emergency_event)
    db.commit()
    db.refresh(db_emergency_event)
    return db_emergency_event
