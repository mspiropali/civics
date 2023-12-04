# Backend

Postgresql 16 is used for the project with databasename civics and default credentials postgres.

At backend/ folder run:  
`pip install -r requirements`  
to install python dependencies then run:  
`uvicorn main:app --reload`  
to start dev server at http://127.0.0.1:8000  

At /docs or /redoc, you can view the API Documentation

Currently Sensor, Emergency Event, Fleet Control and Safety Point endpoints have been created.