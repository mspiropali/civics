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
    "/safety_point/", 
    response_model=schemas.SafetyPoint, 
    status_code=status.HTTP_200_OK,
    description="Create a Safety Point (id, name, location, coordinates) and store it in the Postgresql civics database.",
    summary="Creates a Safety Point",
    tags=["Safety Point"]    
)
def create_safety_point(safety_point: schemas.SafetyPoint, db: Session = Depends(get_db)):
    return crud.create_safety_point(db=db, safety_point=safety_point)

@router.get(
    "/safety_point/", 
    response_model=list[schemas.SafetyPoint],
    description="Retrieve all Safety Points (id, name, location, coordinates) from the Postgresql civics database.",
    summary="Retrieve all Safety Points",
    tags=["Safety Points"]    
)
def read_safety_points(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    safety_points = crud.get_safety_points(db, skip=skip, limit=limit)
    return safety_points

@router.get(
    "/safety_point/{safety_point_id}", 
    response_model=schemas.SafetyPoint,
    description="Retrieve a specific Safety Point (id, name, location, coordinates) by id, from the Postgresql civics database.",
    summary="Retrieve Safety Point by id",
    tags=["Safety Point"] 
)
def read_safety_point(safety_point_id: int, db: Session = Depends(get_db)):
    db_safety_point = crud.get_safety_point(db, safety_point_id=safety_point_id)
    if db_safety_point is None:
        raise HTTPException(status_code=404, detail="Safety Point not found")
    return db_safety_point