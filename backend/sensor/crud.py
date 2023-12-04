from sqlalchemy.orm import Session

from . import models, schemas


def get_sensor(db: Session, sensor_id: int):
    return db.query(models.Sensor).filter(models.Sensor.id == sensor_id).first()


def get_sensors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sensor).offset(skip).limit(limit).all()


def create_sensor(db: Session, sensor: schemas.Sensor):
    db_sensor = models.Sensor(
        name=sensor.name,
        location=sensor.location,
        coordinates=sensor.coordinates,
        status=sensor.status,
        temperature=sensor.temperature,
        humidity=sensor.humidity,
        smoke=sensor.smoke,
        uv=sensor.uv
)
    db.add(db_sensor)
    db.commit()
    db.refresh(db_sensor)
    return db_sensor
