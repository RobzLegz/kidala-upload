from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Header
import os
from passlib.context import CryptContext
from kebab.database import db, PyObjectId, User
from jose import JWTError, jwt
from datetime import datetime, timedelta

ADMIN_TOKEN = os.environ['ADMIN_TOKEN']
SECRET_KEY = os.environ['SECRET_KEY']
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
ALGORITHM = 'HS256'

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='api/v1/users/login')

pwd_context = CryptContext(schemes=['bcrypt'])

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_user(provided_db, username: str, plain_password: str):
    user = provided_db.users.find_one({'username': username})
    if user == None:
        return False
    if not verify_password(plain_password, user['password']):
        return False
    return User(**user)


def create_access_token(data: dict, admin: bool, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    #to_encode.update({"exp": expire})
    if admin:
        encoded_jwt = jwt.encode(to_encode, ADMIN_TOKEN, algorithm=ALGORITHM)
    else:
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
    )
        
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except:
            payload = jwt.decode(token, ADMIN_TOKEN, algorithms=[ALGORITHM])
        user_id: str = payload["user_id"]
    except JWTError:
        raise credentials_exception

    user = db.users.find_one({'_id': PyObjectId(user_id)})

    if user == None:
        raise credentials_exception

    return User(**user)

async def get_potential_user(authorization: str | None = Header(default=None)): #authorization: str | None = Header(None)
    if authorization == None:
        return User()

    token = authorization.replace('Bearer ', '')

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload["user_id"]
    except:
        payload = jwt.decode(token, ADMIN_TOKEN, algorithms=[ALGORITHM])
        user_id: str = payload["user_id"]
    
    user = db.users.find_one({'_id': PyObjectId(user_id)})

    if user == None:
        raise credentials_exception

    return User(**user)




