from fastapi import APIRouter

from ..database import Tag, db

router = APIRouter(
    prefix="/api/v1/tags",
    tags=["tags"],
    responses={404: {"description": "Not found"}},
)

@router.get("/alltags", response_model=list[Tag])
def getAllTags():
    returnlist = []
    query = db.tags.find()
    for file in query:
        returnlist.append(Tag(**file))
    return returnlist