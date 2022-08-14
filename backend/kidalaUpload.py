from functools import wraps
from flask import Flask, request, redirect, send_file, make_response
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId, dumps
from werkzeug.utils import secure_filename
from pathlib import Path
import hashlib
import os

app = Flask(__name__)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 100 * 1000 * 1000


UPLOAD_FOLDER = Path(app.root_path) / "files"
SERVER_IP = os.getenv('SERVER_IP')
MONGO_DB_LINK = os.getenv('MONGODBLINK')
app.config['ADMIN_TOKEN'] = os.getenv('ADMIN_TOKEN')

dbclient = MongoClient(MONGO_DB_LINK)
db = dbclient.kidala
dbfiles = db.files

@app.route("/favicon.ico")
def favicon():
    return send_file(Path(app.root_path) / 'favicon.ico')

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
 
        if not token:
            return make_response({'message': 'a valid token is missing'}, 401)
        if token != app.config['ADMIN_TOKEN']:
            return make_response({'message': 'token is invalid'}, 401)
 
        return f(*args, **kwargs)
    return decorator

@app.route("/admin/delete", methods=['POST'])
@token_required
def deleteFile():
    if 'objectid' in request.json:
        objectid =  request.json['objectid']
    if not objectid:
        return make_response({'message': 'no objectid'})

    query = dbfiles.find_one({'_id': ObjectId(objectid)})
    if query == None:
        return make_response({'msg': 'file not found'}, 404)
    else:
        Path(UPLOAD_FOLDER / query['hash'] / query['name']).unlink()
        Path(UPLOAD_FOLDER / query['hash']).rmdir()

    deletequery = dbfiles.delete_one({'_id': ObjectId(objectid)})
    return make_response({'msg': 'file removed'}, 200)

@app.route("/admin/allfiles", methods=['GET'])
@token_required
def getAllFiles():
    query = dbfiles.find()
    return dumps(query)

@app.route("/<filehash>")
def downloadFile(filehash):
    if filehash != "":
        query = dbfiles.find_one({'hash': filehash})
        if query == None:
            return make_response("file not found", 404)
        else:
            return redirect(f"https://{SERVER_IP}/files/{query['hash']}/{query['name']}")


@app.route('/upload', methods=['POST'])
def upload():

    if 'file' not in request.files:
        return make_response({'msg': "No file part"}, 400)

    file = request.files['file']
    if file.filename == '':
        return make_response({'msg': "No selected file"}, 400)

    if file:

        md5 = hashlib.md5()
        md5.update(file.read())
        md5hash = md5.hexdigest()

        if dbfiles.find_one({'hash': md5hash}) != None:
            return make_response({'msg': "file exists", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash}, 200)

        os.makedirs(UPLOAD_FOLDER / md5hash, exist_ok=True)
        file.stream.seek(0)
        file.save(UPLOAD_FOLDER / md5hash / secure_filename(file.filename))
        
        fileentry = {
            'name': secure_filename(file.filename),
            'hash': md5hash ,
            'size': Path(UPLOAD_FOLDER / md5hash / secure_filename(file.filename)).stat().st_size
        }
        result = dbfiles.insert_one(fileentry)
        
        return make_response({'msg': "success", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash}, 201)

    return make_response({'msg': "failed"}, 500)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
