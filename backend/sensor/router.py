from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal
from . import crud, schemas

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.post(
    "/sensor/", 
    response_model=schemas.Sensor, 
    status_code=status.HTTP_200_OK,
    description="Create an Sensor (id, name, location, coordinates, status, temperature, humidity, smoke, uv) and store it in the Postgresql civics database.",
    summary="Creates a Sensor",
    tags=["Sensor"]    
)
def create_sensor(sensor: schemas.Sensor, db: Session = Depends(get_db)):
    return crud.create_sensor(db=db, sensor=sensor)

@router.get(
    "/sensor/", 
    response_model=list[schemas.Sensor],
    description="Retrieve all Sensors (id, name, location, coordinates, status, temperature, humidity, smoke, uv) from the Postgresql civics database.",
    summary="Retrieve all Sensors",
    tags=["Sensor"]    
)
def read_sensors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sensors = crud.get_sensors(db, skip=skip, limit=limit)
    return sensors

@router.get(
    "/sensor/{sensor_id}", 
    response_model=schemas.Sensor,
    description="Retrieve a specific Sensor (id, name, location, coordinates, status, temperature, humidity, smoke, uv) by id, from the Postgresql civics database.",
    summary="Retrieve Sensor by id",
    tags=["Sensor"] 
)
def read_sensor(sensor_id: int, db: Session = Depends(get_db)):
    db_sensor = crud.get_sensor(db, sensor_id=sensor_id)
    if db_sensor is None:
        raise HTTPException(status_code=404, detail="Sensor not found")
    return db_sensor