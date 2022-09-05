from fastapi import APIRouter, UploadFile, Form, Depends
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import hashlib
import os
import unicodedata
import re
from pathlib import Path

from ..auth import get_potential_user, create_access_token
from ..database import File, User, db, Tag
from ..main import SERVER_URL, APP_ROOT

UPLOAD_FOLDER = APP_ROOT / 'files'

class Page(BaseModel):
    files: list[File]
    total: int
    total_page: int
    page: int
    limit: int

class UploadResponse(BaseModel):
    msg: str
    url: str
    file: File
    token: str | None = None

router = APIRouter(
    prefix="/files",
    tags=["files"],
    responses={404: {"description": "Not found"}},
)

def secure_filename(filename: str) -> str:
    _filename_ascii_strip_re = re.compile(r"[^A-Za-z0-9_.-]")

    filename = unicodedata.normalize("NFKD", filename)
    filename = filename.encode("ascii", "ignore").decode("ascii")

    for sep in os.path.sep, os.path.altsep:
        if sep:
            filename = filename.replace(sep, " ")
    filename = str(_filename_ascii_strip_re.sub("", "_".join(filename.split()))).strip("._")

    _windows_device_files = (
        "CON",
        "AUX",
        "COM1",
        "COM2",
        "COM3",
        "COM4",
        "LPT1",
        "LPT2",
        "LPT3",
        "PRN",
        "NUL",
    )

    if os.name == "nt" and filename and filename.split(".")[0].upper() in _windows_device_files:
        filename = f"_{filename}"

    return filename

@router.get("/allfiles", response_model=Page)
def all_files(page: int = 0, limit: int = 20):
    if page >= 0 and limit >= 0:
        files = list(db.files.find().skip(page * limit).limit(limit)) 
        return Page(files=files, page=page, limit=limit, total=db.files.count_documents({}), total_page=files.count({}))
    else:
        return []

@router.get('/file', response_model=File)
def get_file(file_hash: str):
    file = db.files.find_one({'hash': file_hash})
    return File(**file)

@router.post('/upload', response_model=UploadResponse)
def upload_file(file: UploadFile, tag: str | None= Form(), description: str = Form(), private: str = Form(), user: User = Depends(get_potential_user)):
    md5object = hashlib.md5()
    md5object.update(file.read())
    md5string = md5object.hexdigest()

    query = db.files.find_one({'hash': md5string})

    if query != None:
        return UploadResponse(
            msg="file already exists",
            url=f'{SERVER_URL}/uploads/{query["hash"]}/{query["name"]}',
            file=File(**query)
            )

    os.makedirs(UPLOAD_FOLDER / md5string, exist_ok=True)
    file.seek(0)
    file.save(UPLOAD_FOLDER / md5string / secure_filename(file.filename))

    if tag == '':
        tag_id = None
    else:
        tag.lower()

        tagquery = db.tags.find_one({'tag': tag})

        if tagquery == None:
            tagobject = Tag(tag_text=tag)

            created_tag = db.tags.insert_one(jsonable_encoder(tagobject))

            tag_id = created_tag.inserted_id
        else:
            tag_id = tagquery['_id']

    
    if private == 'true':
        private_bool = True
    else:
        private_bool = False

    if user.id == None:
        inserted_user = db.users.insert_one(jsonable_encoder(user))
        access_token = create_access_token(data={'user_id': str(inserted_user.inserted_id)}, admin=False)

        user.id = inserted_user.inserted_id
    else:
        access_token = None

    upload_file = File(
            name=secure_filename(file.filename),
            hash=md5string,
            size=Path(UPLOAD_FOLDER / md5string / secure_filename(file.filename)).stat().st_size,
            author=user.id,
            tag=tag_id,
            description=description,
            private=private_bool
            )

    return UploadResponse(
        msg="file uploaded",
        url=f'{SERVER_URL}/uploads/{query["hash"]}/{query["name"]}',
        file=upload_file,
        token=access_token
        )
            