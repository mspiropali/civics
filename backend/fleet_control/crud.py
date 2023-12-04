from sqlalchemy.orm import Session

from . import models, schemas


def get_fleet_control(db: Session, fleet_control_id: int):
    return db.query(models.FleetControl).filter(models.FleetControl.id == fleet_control_id).first()


def get_fleet_controls(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.FleetControl).offset(skip).limit(limit).all()


def create_fleet_control(db: Session, fleet_control: schemas.FleetControl):
    db_fleet_control = models.FleetControl(
        vehicle=fleet_control.vehicle,
        eta=fleet_control.eta,
        coordinates=fleet_control.coordinates
)
    db.add(db_fleet_control)
    db.commit()
    db.refresh(db_fleet_control)
    return db_fleet_control
