from fastapi import FastAPI
from fastapi.responses import FileResponse
from pathlib import Path
from pydantic import BaseModel
from bson import ObjectId
import motor

app = FastAPI()

#client = motor.mot

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class User(BaseModel):
    id: ObjectId
    ip:

class Tag(BaseModel):
    id: ObjectId
    tag_text: str

class File(BaseModel):
    id: ObjectId
    name: str
    hash: str
    size: int
    author: User
    tag: Tag
    private: bool
    description: str

@app.get("/favicon.ico")
async def favicon():
    return FileResponse(Path(app.root_path) / 'favicon.ico')

@app.get("/")
async def root():
    return {"message": "Hello World"}
