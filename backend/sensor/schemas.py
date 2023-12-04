from typing import Optional
from pydantic import BaseModel, Field

class Sensor(BaseModel):
    id: Optional[int] | None = Field(default=None, description="A unique Sensor id")
    name:str = Field(description="User assigned name of the Sensor")
    location:str = Field(description="The place where the Sensor is located")
    coordinates:str = Field(description="Geographical coordinates (longitude, latitude) of the Sensor's location")
    status:str = Field(description="An enum () describing the current status of the sensor")
    temperature:int = Field(description="The sensor's temperature reading in °C")
    humidity:int = Field(description="The sensor's humidity reading in RH")
    smoke:int = Field(description="The sensor's smoke reading in OD")
    uv:int = Field(description="The sensor's UV reading in UV")
    emergency_event_id:int

    class Config:
        from_attributes = True