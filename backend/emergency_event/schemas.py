from typing import Optional
from pydantic import BaseModel, Field
from sensor.schemas import Sensor

class EmergencyEvent(BaseModel):
    id: Optional[int] | None = Field(default=None, description="A unique Emergency Event id")
    name:str = Field(description="User assigned name of the Emergency Event")
    type:str = Field(description="An enum (Fire | Flood), which describes the type of Emergency Event")
    location:str = Field(description="The place where the Emergency Event appeared")
    coordinates:str = Field(description="Geographical coordinates (longitude, latitude) of the Emergenvcy Event's location")
    severity:str = Field(description="An enum (Low | Normal | High), which describes the severity of the Emergency Event")
    sensors: list[Sensor] = []
    
    class Config:
        from_attributes = True