import asyncpg
from database import DSN

class FactoryListener:
    websockets = []
    
    def __init__(self, table):
        self.connection = None
        self.table = table
        self.websockets = []  # Move the websockets list here

    async def on_notification(self, conn, pid, channel, payload):
        print(f"Insert in table |{channel.split('_inserted')[0]}| from PID {pid} with data: {payload}")
        for websocket in self.websockets:
            await websocket.send_json({"data": payload})

    async def setup_listener(self):
        # Todo: .env
        self.connection = await asyncpg.connect(DSN)
    
        trigger_exists = await self.check_trigger_existence()
        function_exists = await self.check_function_existence()

        if not trigger_exists or not function_exists:
            print(f"WARNING: Trigger |{self.table}_inserted| does not exist")
            await self.generate_function_and_trigger()
        
        await self.connection.add_listener(self.table + '_inserted', self.on_notification)


    async def check_trigger_existence(self):
        query = f'SELECT tgname FROM pg_trigger WHERE tgrelid = \'{self.table}\'::regclass;'
        result = await self.connection.fetch(query)
        return bool(result)

    async def check_function_existence(self):
        query = f'SELECT proname FROM pg_proc WHERE proname = \'notify_{self.table}_insert\';'
        result = await self.connection.fetch(query)
        return bool(result)

    async def generate_function_and_trigger(self):
        function_name = f"notify_{self.table}_insert"
        trigger_name = f"{self.table}_insert_trigger"
        # unique notification channel for table, if same
        channel_name = f"{self.table}_inserted"

        # Generate the function SQL
        function_sql = f"""
        CREATE OR REPLACE FUNCTION {function_name}()
        RETURNS TRIGGER AS $$
        DECLARE
            inserted_data JSONB;
        BEGIN
            -- Convert the NEW row data to JSONB
            inserted_data = row_to_json(NEW)::JSONB;

            -- Add a timestamp field to the JSONB data
            --inserted_data = inserted_data || jsonb_build_object('timestamp', now());

            -- Perform the notification with the enhanced JSONB data
            PERFORM pg_notify('{channel_name}', inserted_data::TEXT);

            RETURN NEW::RECORD;
        END;
        $$ LANGUAGE plpgsql;
        """

        # Generate the trigger SQL
        trigger_sql = (f"\n"
                       f"        CREATE TRIGGER {trigger_name}\n"
                       f"        AFTER INSERT ON {self.table}\n"
                       f"        FOR EACH ROW EXECUTE FUNCTION {function_name}();\n"
                       f"        ")

        # Execute the SQL statements
        await self.connection.execute(function_sql)
        await self.connection.execute(trigger_sql)

        print(f"Generated function and trigger for {self.table} on channel {channel_name}")

    async def cleanup_listener(self):
        if self.connection:
            await self.connection.close()