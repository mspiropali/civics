from typing import Optional
from pydantic import BaseModel, Field

class SafetyPoint(BaseModel):
    id: Optional[int] | None = Field(default=None, description="A unique Safety Point id")
    name:str = Field(description="User assigned name of the Safety Point")
    location:str = Field(description="The place where the Safety Point is located")
    coordinates:str = Field(description="Geographical coordinates (longitude, latitude) of the Safety Point's location")

    class Config:
        from_attributes = True