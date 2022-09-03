from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm 


from ..database import Token, db, AdminUser, User
from ..auth import authenticate_user, create_access_token, get_current_admin_user

router = APIRouter(
    prefix="/admin",
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


@router.get("/me", response_model=AdminUser)
async def read_users_me(current_user: AdminUser = Depends(get_current_admin_user)):
    return current_user
