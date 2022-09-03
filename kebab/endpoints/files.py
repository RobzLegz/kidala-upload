from cgitb import reset
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from json import JSONEncoder, dumps

from ..database import File, db

router = APIRouter(
    prefix="/files",
    tags=["files"],
    responses={404: {"description": "Not found"}},
)

@router.get("/allfiles", response_model=list[File])
async def all_files():
    files = list(db.files.find())
    return files