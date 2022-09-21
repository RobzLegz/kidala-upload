import pymongo
import os
from pydantic import BaseModel, Field
from bson import ObjectId

MONGO_DB_LINK = os.environ["MONGO_DB_LINK"]

client = pymongo.MongoClient(MONGO_DB_LINK)
db = client.kidala

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
    id: PyObjectId | None = Field(default_factory=None, alias="_id")
    ip: str | None = None
    username: str | None = None
    password: str | None = None
    role: str | None = None

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True
        allow_population_by_field_name = True


class Tag(BaseModel):
    id: PyObjectId | None = Field(default_factory=None, alias="_id")
    tag: str

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True
        allow_population_by_field_name = True

class File(BaseModel):
    id: PyObjectId | None = Field(default_factory=None, alias="_id")
    name: str
    hash: str
    size: int
    author: PyObjectId | None = None
    tag: list[Tag] | None = []
    private: bool = False
    description: str | None = None

    class Config:
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True
        allow_population_by_field_name = True

class Token(BaseModel):
    access_token: str
    token_type: str