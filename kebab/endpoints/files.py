from cgitb import reset
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from json import JSONEncoder, dumps

from ..database import File, db

class Page(BaseModel):
    files: list[File]
    total: int
    total_page: int
    page: int
    limit: int

router = APIRouter(
    prefix="/files",
    tags=["files"],
    responses={404: {"description": "Not found"}},
)

@router.get("/allfiles", response_model=Page)
async def all_files(page: int = 0, limit: int = 20):
    if page >= 0 and limit >= 0:
        files = list(db.files.find().skip(page * limit).limit(limit)) 
        return Page(files=files, page=page, limit=limit, total=db.files.count_documents({}), total_page=files.count({}))
    else:
        return []

@router.get('/file', response_model=File)
async def get_file(file_hash: str):
    file = db.files.find_one({'hash': file_hash})
    return File(**file)
