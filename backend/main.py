from fastapi import FastAPI
from database import SessionLocal, engine
from emergency_event import models as emergency_event_model, router as emergency_event_router
from sensor import models as sensor_model, router as sensor_router
from fleet_control import models as fleet_control_model, router as fleet_control_router
from safety_point import models as safety_point_model, router as safety_point_router

emergency_event_model.Base.metadata.create_all(bind=engine)
sensor_model.Base.metadata.create_all(bind=engine)
fleet_control_model.Base.metadata.create_all(bind=engine)
safety_point_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


app.include_router(emergency_event_router.router)
app.include_router(sensor_router.router)
app.include_router(fleet_control_router.router)
app.include_router(safety_point_router.router)


@app.get("/")
async def read_root():
    return {"Hello": "World"}
