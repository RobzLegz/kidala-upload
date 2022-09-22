from fastapi import APIRouter, Depends, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm 

from ..database import User, File, db, Token, User
from ..auth import get_current_user, authenticate_user, create_access_token, get_password_hash, get_potential_user

router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],
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

@router.post("/register", response_model=User)
async def register_user(username: str = Form(), password: str = Form(), email: str = Form(), current_user: User = Depends(get_potential_user)):
    emailq = db.users.find_one({"email": email.lower()})
    if emailq != None:
        return {"err": "User with this e-mail already exists."}

    if not username.isalnum():
        return {"err": "Username should only contain alphanumeric characters"}

    usernameq = db.users.find_one({"username": username})
    if usernameq != None:
        return {"err": "User with this username already exists."}

    hashed_pass = get_password_hash(password)

    if current_user.id == None:
        user = User(email=email, username=username, password=hashed_pass, role='default')

        db.users.insert_one(user.dict(exclude={'id'}))

    else:
        user = db.users.find_one({"_id": current_user.id})
        user["email"] = email
        user["password"] = hashed_pass
        user["username"] = username

        db.users.replace_one({'_id': current_user.id}, user)

    return user

@router.get("/me", response_model=User)
async def get_own_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/me/items", response_model=list[File])
async def read_own_items(current_user: User = Depends(get_current_user), cursor: int = 0, limit: int = 20):
    if cursor >= 0 and limit >= 0:
        dbcursor = db.files.find({"_id": {"$in": current_user.files}}).skip(cursor).limit(limit)
        returnlist = []
        for file in dbcursor:
            returnlist.append(File(**file))
        return {'files': returnlist, 'count':len(returnlist), 'total_userfiles':db_cursor.count()}
    else:
        raise HTTPException(400)
