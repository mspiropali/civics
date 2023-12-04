"""Docstring"""
from sqlalchemy import Column, Integer, String
from database import Base


class FleetControl(Base):

    __tablename__ = "fleet_control"

    id = Column(Integer, primary_key=True, index=True)
    vehicle = Column(String, index=True)
    eta = Column(Integer)
    coordinates = Column(String, index=True)
