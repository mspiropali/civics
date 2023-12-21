from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
DSN = "postgresql://postgres:postgres@localhost:5433/civics"

engine = create_engine(DSN)

trigger = f''''CREATE OR REPLACE FUNCTION "emergency_event_notify"() 
RETURNS trigger AS $$
DECLARE
BEGIN
	IF NEW.id IS NULL THEN
	RAISE EXCEPTION 'Emergency Event id cannot be null';
	END IF;
	
	PERFORM pg_notify('new_emergency_event', NEW.id::text);
	RETURN NEW;
END;

$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER "trig_emergency_event_insert" 
AFTER INSERT ON emergency_events
FOR EACH ROW EXECUTE PROCEDURE "emergency_event_notify"();'''

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
