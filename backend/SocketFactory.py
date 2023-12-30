from fastapi import FastAPI, WebSocket
from NotificationListener import FactoryListener


class SocketFactory:
    listener: FactoryListener

    def __init__(self, app: FastAPI, table: str):
        self.table = table
        self.listener = FactoryListener(table)

        @app.websocket(f"/{table}")
        async def websocket_route(websocket: WebSocket):
            await self.handle_websocket(websocket)

        @app.on_event("startup")
        async def startup_event():
            await self.listener.setup_listener()

        @app.on_event("shutdown")
        async def shutdown_event():
            await self.listener.cleanup_listener()

    async def handle_websocket(self, websocket: WebSocket):
        await websocket.accept()
        self.listener.websockets.append(websocket)
       
        try:
            await websocket.send_json({"msg": f"Listening for table: {self.table} insertions"})
            while True:
                msg = await websocket.receive_text()
                if msg == "close" : break
        except Exception as e: print(f"Unknown error: {e}")
        finally:
            print(f"WebSocket disconnected for table: {self.table}")
            self.listener.websockets.remove(websocket)
            await self.listener.cleanup_listener()