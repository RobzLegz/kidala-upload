from fastapi import FastAPI
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uvicorn
import os

from .endpoints import admin, files, tags, users
from .database import db, User

app = FastAPI()

APP_ROOT = Path('kebab')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(tags.router)
app.include_router(files.router)
app.include_router(users.router)

SERVER_URL = os.environ["SERVER_URL"]

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(APP_ROOT / 'favicon.ico')

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/{filehash}")
async def redirectFile(filehash: str):
    if (query := db.files.find_one({'hash': filehash})) == None:
        return "File not found"
    else:
        return RedirectResponse(f"https://{SERVER_URL}/uploads/{query['hash']}/{query['name']}")



if __name__ == '__main__':
    uvicorn.run("main:app", host='127.0.0.1', port=8000, log_level="info", reload=True)

