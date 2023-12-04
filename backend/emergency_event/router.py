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
    "/emergency_event/", 
    response_model=schemas.EmergencyEvent, 
    status_code=status.HTTP_200_OK,
    description="Create an Emergency Event (id, name, type, location, coordinates, severity) and store it in the Postgresql civics database.",
    summary="Creates a new Emergency Event",
    tags=["Emergency Event"]    
)
def create_emergency_event(emergency_event: schemas.EmergencyEvent, db: Session = Depends(get_db)):
    return crud.create_emergency_event(db=db, emergency_event=emergency_event)

@router.get(
    "/emergency_event/", 
    response_model=list[schemas.EmergencyEvent],
    description="Retrieve all Emergency Events (id, name, type, location, coordinates, severity) from the Postgresql civics database.",
    summary="Retrieve all Emergency Events",
    tags=["Emergency Event"]   
)
def read_emergency_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    emergency_events = crud.get_emergency_events(db, skip=skip, limit=limit)
    return emergency_events

@router.get(
    "/emergency_event/{emergency_event_id}", 
    response_model=schemas.EmergencyEvent,
    description="Retrieve a specific Emergency Event (id, name, type, location, coordinates, severity) from the Postgresql civics database.",
    summary="Retrieve Emergency Event by id",
    tags=["Emergency Event"]       
)
def read_emergency_event(emergency_event_id: int, db: Session = Depends(get_db)):
    db_emergency_event = crud.get_emergency_event(db, emergency_event_id=emergency_event_id)
    if db_emergency_event is None:
        raise HTTPException(status_code=404, detail="Emergency Event not found")
    return db_emergency_event