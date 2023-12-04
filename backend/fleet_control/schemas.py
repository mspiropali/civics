from typing import Optional
from pydantic import BaseModel, Field

class FleetControl(BaseModel):
    id: Optional[int] | None = Field(default=None, description="A unique Fleet Control id")
    vehicle:str = Field(description="Vehicle of the Fleet Control")
    eta:int = Field(description="The estimated time of arrival of the vehicle")
    coordinates:str = Field(description="Current longitude and latitude of the vehicle")

    class Config:
        from_attributes = True