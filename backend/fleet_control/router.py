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
    "/fleet_control/", 
    response_model=schemas.FleetControl, 
    status_code=status.HTTP_200_OK,
    description="Create a Fleet Control (id, vehicle, eta, coordinates) and store it in the Postgresql civics database.",
    summary="Creates a Fleet Control",
    tags=["Fleet Control"]    
)
def create_fleet_control(fleet_control: schemas.FleetControl, db: Session = Depends(get_db)):
    return crud.create_fleet_control(db=db, fleet_control=fleet_control)

@router.get(
    "/fleet_control/", 
    response_model=list[schemas.FleetControl],
    description="Retrieve all Fleet Controls (id, vehicle, eta, coordinates) from the Postgresql civics database.",
    summary="Retrieve all Fleet Controls",
    tags=["Fleet Control"]    
)
def read_fleet_controls(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    fleet_controls = crud.get_fleet_controls(db, skip=skip, limit=limit)
    return fleet_controls

@router.get(
    "/fleet_control/{fleet_control_id}", 
    response_model=schemas.FleetControl,
    description="Retrieve a specific Fleet Control (id, vehicle, eta, coordinates) by id, from the Postgresql civics database.",
    summary="Retrieve Fleet Control by id",
    tags=["Fleet Control"] 
)
def read_fleet_control(fleet_control_id: int, db: Session = Depends(get_db)):
    db_fleet_control = crud.get_fleet_control(db, fleet_control_id=fleet_control_id)
    if db_fleet_control is None:
        raise HTTPException(status_code=404, detail="Fleet Control not found")
    return db_fleet_control