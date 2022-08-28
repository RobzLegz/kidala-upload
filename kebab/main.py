from fastapi import FastAPI
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI()

@app.route("/favicon.ico")
def favicon():
    return FileResponse(Path(app.root_path) / 'favicon.ico')

@app.get("/")
async def root():
    return {"message": "Hello World"}
