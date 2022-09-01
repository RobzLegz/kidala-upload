from fastapi import APIRouter, Depends

from kebab.database import User, File
from kebab.auth import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=User)
async def get_own_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/me/items", response_model=list[File])
async def read_own_items(current_user: User = Depends(get_current_user)):
    return [{"msg": "not finished"}]