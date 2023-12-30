import aiopg
import asyncio
from fastapi import FastAPI
from fastapi.websockets import WebSocket
import psycopg2
from sqlalchemy import text
from database import SessionLocal, engine, DSN
from emergency_event import models as emergency_event_model, router as emergency_event_router
from sensor import models as sensor_model, router as sensor_router
from fleet_control import models as fleet_control_model, router as fleet_control_router
from safety_point import models as safety_point_model, router as safety_point_router
from SocketFactory import SocketFactory

emergency_event_model.Base.metadata.create_all(bind=engine)
sensor_model.Base.metadata.create_all(bind=engine)
fleet_control_model.Base.metadata.create_all(bind=engine)
safety_point_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

sensors_factory = SocketFactory(app, sensor_model.Sensor.__tablename__)
fleet_control_factory = SocketFactory(app, fleet_control_model.FleetControl.__tablename__)
safety_point_factory = SocketFactory(app, safety_point_model.SafetyPoint.__tablename__)
emergency_event_factory = SocketFactory(app, emergency_event_model.EmergencyEvent.__tablename__)

# async def listen(conn):
#     async with conn.cursor() as cur:
#         await cur.execute("LISTEN new_emergency_event")
        
#         while True:
#             try:
#                 msg = await conn.notifies.get()
#             except psycopg2.Error as ex:
#                 print("ERROR: ", ex)
#                 await websocket.close()
#                 return
#             if msg.payload == "finish":
#                 return
#             else:
#                 await websocket.send_json({"msg": msg.payload})
#                 print("Receive <-", msg.payload)

# @app.websocket("/new_event")
# async def websocket(websocket: WebSocket):
#     await websocket.accept()
#     async with aiopg.connect(DSN) as conn:
#         async with conn.cursor() as cur:
#             await cur.execute("LISTEN new_emergency_event")
            
#             while True:
#                 try:
#                     msg = await conn.notifies.get()
#                 except psycopg2.Error as ex:
#                     print("ERROR: ", ex)
#                     await websocket.close()
#                     return
#                 if msg.payload == "finish":
#                     return
#                 else:
#                     await websocket.send_json({"msg": msg.payload})
#                     print("Receive <-", msg.payload)


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
