import shutil
from fastapi import APIRouter, UploadFile, Form, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
import hashlib
import os
import unicodedata
import re
from pathlib import Path

from ..auth import get_potential_user, create_access_token
from ..database import File, User, db, Tag

APP_ROOT = Path('kebab')
SERVER_URL = os.environ["SERVER_URL"]
UPLOAD_FOLDER =  APP_ROOT / 'files'

class Page(BaseModel):
    files: list[File]
    total: int
    total_page: int
    page: int
    limit: int

# class UploadResponse(BaseModel):
#     msg: str
#     url: str
#     file: File
#     token: str | None = None

router = APIRouter(
    prefix="/api/v1/files",
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

@router.get("/allfiles")
def all_files(cursor: int = 0, limit: int = 20):
    if cursor >= 0 and limit >= 0:
        returnlist = []
        db_cursor = db.files.find().skip(cursor).limit(limit)
        for file in db_cursor:
            returnlist.append(File(**file))

        return {'files': returnlist, 'cursor':limit+cursor, 'count':len(returnlist), 'total_db':db.files.count_documents({})}
        #this doesnt work due to fastapi bug
        #return Page(files=returnlist, page=page, limit=limit, total=db.files.count_documents({}), total_page=returnlist.count({}))
    else:
        raise HTTPException(400)

@router.get('/file', response_model=File)
def get_file(file_hash: str):
    file = db.files.find_one({'hash': file_hash})
    if file != None:
        return File(**file)
    else:
        raise HTTPException(404)

@router.post('/upload') # response_model=UploadResponse
async def upload_file(file: UploadFile, tag: str | None = Form(None), description: str | None = Form(None), private: str | None = Form(None), user: User = Depends(get_potential_user)):
    md5object = hashlib.md5()
    md5object.update(file.file.read())
    md5string = md5object.hexdigest()

    query = db.files.find_one({'hash': md5string})

    if query != None:
        # return UploadResponse(
        #     msg="file already exists",
        #     url=f'{SERVER_URL}/uploads/{md5string}/{secure_filename(file.filename)}',
        #     file=File(**query)
        #     )
        return {
            'msg':"file already exists",
            'url':f'{SERVER_URL}/files/{md5string}/{secure_filename(file.filename)}',
            'file':File(**query)
        }

    os.makedirs(UPLOAD_FOLDER / md5string, exist_ok=True)

    await file.seek(0)
    with open((UPLOAD_FOLDER / md5string / secure_filename(file.filename)), 'wb') as file_object:
        shutil.copyfileobj(file.file, file_object)
    await file.close()


    if tag == '' or tag == None:
        tag_id = None
    else:
        tag.lower()

        tagquery = db.tags.find_one({'tag': tag})

        if tagquery == None:
            tagobject = Tag(tag_text=tag)

            created_tag = db.tags.insert_one(tagobject.dict(exclude={'id'}))

            tag_id = created_tag.inserted_id
        else:
            tag_id = tagquery['_id']

    
    if private == 'true':
        private_bool = True
    else:
        private_bool = False

    if user.id == None:
        inserted_user = db.users.insert_one(user.dict(exclude={'id'}))
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
        private=private_bool,
        )

    insert_file = db.files.insert_one(upload_file.dict(exclude={'id'}))

    upload_file.id = insert_file.inserted_id

    # return UploadResponse(
    #     msg="file uploaded",
    #     url=f'{SERVER_URL}/files/{hash}/{secure_filename(file.filename)}',
    #     file=upload_file,
    #     token=access_token
    #     )

    return {
        'msg':"file uploaded",
        'url':f'{SERVER_URL}/files/{md5string}/{secure_filename(file.filename)}',
        'file':upload_file,
        'token':access_token
    }
            