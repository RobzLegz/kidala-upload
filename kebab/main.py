from fastapi import FastAPI
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import uvicorn
import os

from .endpoints import admin, files, tags, users
from .database import PyObjectId, db, User

app = FastAPI()

APP_ROOT = Path('kebab')
SERVER_URL = os.environ["SERVER_URL"]

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

@app.get("/migrate")
async def favicon():
    dbcursor = db.files.find()
    for file in dbcursor:
        print(file)
        if 'tag' in file:
            if file['tag'] != None:
                db.files.update_one(
                    {'_id': file['_id']},
                    {'$set':
                        {'tag': 
                            [
                                db.tags.find_one({'_id': PyObjectId(file['tag'])})          
                            ]
                        }
                    }
                )

            else:
                db.files.update_one(
                    {'_id': file['_id']},
                    {'$set':
                        {'tag': 
                            [   
                            ]
                        }
                    }
                )
        else:
            db.files.update_one(
                    {'_id': file['_id']},
                    {'$set':
                        {'tag': 
                            [   
                            ]
                        }
                    }
                )
    return 'success'

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(APP_ROOT / 'favicon.ico')

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/files/{filehash}/{filename}")
async def return_file(filehash: str, filename: str):
    return FileResponse(Path(APP_ROOT / "files" / filehash / filename))

@app.get("/{filehash}")
async def redirectFile(filehash: str):
    if (query := db.files.find_one({'hash': filehash})) == None:
        return "File not found"
    else:
        return RedirectResponse(f"{SERVER_URL}/files/{query['hash']}/{query['name']}")

if __name__ == '__main__':
    uvicorn.run("main:app", host='127.0.0.1', port=8000, log_level="info", reload=True)

