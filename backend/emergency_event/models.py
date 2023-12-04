from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from database import Base

class EmergencyEvent(Base):
    __tablename__ = "emergency_events"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(Enum("Fire", "Flood", name="type_enum", create_type=False), index=True)
    location = Column(String, index=True)
    coordinates = Column(String, index=True)
    severity = Column(Enum("Low", "Normal", "High", name="severity_enum", create_type=False), index=True)

    sensors = relationship("Sensor", back_populates="owner")
    