from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pathlib import Path

from ..database import Token, db, User
from ..auth import authenticate_user, create_access_token, get_current_user, PyObjectId
from files import UPLOAD_FOLDER

router = APIRouter(
    prefix="/api/v1/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
)

@router.post("/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"user_id": str(user.id)})

    return Token(access_token=access_token, token_type='bearer')

@router.post("/delete")
async def delete_file(file_id: str, user: User = Depends(get_current_user)):
    if user.role != 'admin' or not file_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect authorization",
            headers={"WWW-Authenticate": "Bearer"},
        )

    file_query = db.files.find_one({'_id': PyObjectId(file_id)})
    if file_query == None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="File not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    else:
        Path(UPLOAD_FOLDER / file_query['hash'] / file_query['name']).unlink()
        Path(UPLOAD_FOLDER / file_query['hash']).rmdir()

    db.files.delete_one({'_id': PyObjectId(file_id)})
    db.users.update_one({'_id': PyObjectId(file_query['author'])}, {'$pull': {'files': PyObjectId(file_id)}})
    
    return {'msg': 'file deleted'}


