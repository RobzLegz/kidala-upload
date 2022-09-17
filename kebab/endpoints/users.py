from fastapi import APIRouter, Depends

from ..database import User, File, db
from ..auth import get_current_user

router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=User)
async def get_own_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/me/items", response_model=list[File])
async def read_own_items(current_user: User = Depends(get_current_user)):
    dbcursor = db.files.find({"_id": current_user[id]})
    returnlist = []
    for file in dbcursor:
        returnlist.append(File(**file))
    return returnlist