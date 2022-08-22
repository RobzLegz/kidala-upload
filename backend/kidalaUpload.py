from functools import wraps
import json
from flask import Flask, request, redirect, send_file, make_response, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
from datetime import datetime
import jwt
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash
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
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

dbclient = MongoClient(MONGO_DB_LINK)
db = dbclient.kidala
dbfiles = db.files
dbusers = db.users


@app.route("/favicon.ico")
def favicon():
    return send_file(Path(app.root_path) / 'favicon.ico')

def token_check(role):
    def token_required(f):
        @wraps(f)
        def decorator(*args, **kwargs):
            if 'Authorization' in request.headers:
                access_token = request.headers['Authorization']
                try:
                    kwargs['user_ID'] = jwt.decode(access_token, app.config['SECRET_KEY'], algorithms='HS256')['user_id']
                except:
                    kwargs['user_ID'] = jwt.decode(access_token, app.config['ADMIN_TOKEN'], algorithms='HS256')['user_id']
            elif role == 'default':
                kwargs['user_ID'] = None
            elif role == 'admin':
                return make_response({'msg': 'authorization required'}, 401)

            kwargs['user_IP'] = request.environ.get('HTTP_X_FORWARDED_FOR') 
            return f(*args, **kwargs)
        return decorator
    return token_required

@app.route("/admin/login", methods=['POST'])
def login():
    if 'username' and 'password' in request.json:
        username = request.json['username']
        password = request.json['password']
    else:
        make_response({'msg': 'missing username or password'}, 400)
    query  = dbusers.find_one({'username': username})
    if query == None:
        make_response({'msg': 'user not found'}, 400)
    if check_password_hash(query['password'], password):
        token = jwt.encode({'user_id': str(query['_id']), 'createdAt': datetime.utcnow().isoformat()}, app.config['ADMIN_TOKEN'])
        query['_id'] = str(query['_id'])
        return make_response({'access_token': token, 'info': query}, 200)
    else:
        return make_response({'msg': 'incorrect password'}, 400)

@app.route("/admin/getUser", methods=['GET'])
@token_check('default')
def getuser(**kwargs):
    if kwargs['user_ID'] == None:
        return make_response({'msg': 'nah nav tokens? kidala'}, 400)
    user = dbusers.find_one({'_id': ObjectId(kwargs['user_ID'])})
    user['_id'] = str(user['_id'])
    return make_response({'user': user}, 200)


@app.route("/admin/delete", methods=['POST'])
@token_check('admin')
def deleteFile(**kwargs):
    if 'objectid' in request.json:
        objectid = request.json['objectid']
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
@token_check('default')
def getAllFiles(**kwargs):
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
@token_check('default')
def upload(**kwargs):

    if 'file' not in request.files:
        return make_response({'msg': "No file part"}, 400)

    file = request.files['file']
    if file.filename == '':
        return make_response({'msg': "No selected file"}, 400)

    if file:

        md5 = hashlib.md5()
        md5.update(file.read())
        md5hash = md5.hexdigest()

        filequery = dbfiles.find_one({'hash': md5hash})

        if filequery != None:
            filequery['_id'] = str(filequery['_id'])
            return make_response(jsonify({'msg': "file exists", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash, 'file': filequery}), 200)

        os.makedirs(UPLOAD_FOLDER / md5hash, exist_ok=True)
        file.stream.seek(0)
        file.save(UPLOAD_FOLDER / md5hash / secure_filename(file.filename))

        if kwargs['user_ID'] == None:
            user = dbusers.insert_one({'ip': kwargs['user_IP']})
            token = jwt.encode({'user_id': str(user.inserted_id)}, app.config['SECRET_KEY'])

            fileentry = {
                'name': secure_filename(file.filename),
                'hash': md5hash,
                'size': Path(UPLOAD_FOLDER / md5hash / secure_filename(file.filename)).stat().st_size,
                'author': str(user.inserted_id)
            }

            result = dbfiles.insert_one(fileentry)
            
            fileentry.update({'_id': str(result.inserted_id)})

            return make_response(jsonify({'msg': "success", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash, 'access_token': token, 'file': fileentry}), 201)

        else:
            phoneNumber = request.json['phoneNumber']
            email = request.json['email']
            is_ad = request.json['isAd']

            if is_ad:
                adentry = {
                    'name': secure_filename(file.filename),
                    'hash': md5hash,
                    'size': Path(UPLOAD_FOLDER / md5hash / secure_filename(file.filename)).stat().st_size,
                    'author': kwargs['user_ID'],
                    'phoneNumber': phoneNumber,
                    'email': email,
                    'is_ad': True
                }

                result = dbfiles.insert_one(adentry)

                adentry.update({'_id': str(result.inserted_id)})

                return make_response(jsonify({'msg': "success", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash, 'entry': adentry}), 201)
            else:
                fileentry = {
                    'name': secure_filename(file.filename),
                    'hash': md5hash,
                    'size': Path(UPLOAD_FOLDER / md5hash / secure_filename(file.filename)).stat().st_size,
                    'author': kwargs['user_ID']
                }

                result = dbfiles.insert_one(fileentry)

                fileentry.update({'_id': str(result.inserted_id)})

                return make_response(jsonify({'msg': "success", 'url': f"https://{SERVER_IP}/{md5hash}", 'hash': md5hash, 'file': fileentry}), 201)

    return make_response({'msg': "failed"}, 500)


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
