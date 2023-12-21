"""Docstring"""
from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Sensor(Base):
    """Docstring"""
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    coordinates = Column(String, index=True)
    status = Column(Enum(
        "Low", "Normal", "High", name="status_enum", create_type=False), index=True)
    temperature = Column(Integer)
    humidity = Column(Integer)
    smoke = Column(Integer)
    uv = Column(Integer)

    # emergency_event_id = Column(Integer, ForeignKey("emergency_events.id"))
    # owner = relationship("EmergencyEvent", back_populates="sensors")
