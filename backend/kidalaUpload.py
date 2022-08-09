from flask import Flask, request, redirect, send_file, send_from_directory, make_response
from flask_cors import CORS
from pymongo import MongoClient
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

dbclient = MongoClient(MONGO_DB_LINK)
db = dbclient.kidala
dbfiles = db.files

@app.route("/favicon.ico")
def favicon():
    return send_file(Path(app.root_path) / 'favicon.ico')

@app.route("/<filehash>")
def downloadFile(filehash):
    if filehash != "":
        query = dbfiles.find_one({'hash': filehash})
        if query == None:
            return make_response("file not found", 404)
        else:
            return send_from_directory(UPLOAD_FOLDER / filehash, query["name"])
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
            return make_response({'msg': "file exists", 'url': f"https://{SERVER_IP}:8000/{md5hash}"}, 200)

        os.makedirs(UPLOAD_FOLDER / md5hash, exist_ok=True)
        file.stream.seek(0)
        file.save(UPLOAD_FOLDER / md5hash / secure_filename(file.filename))
        fileentry = {
            'name': secure_filename(file.filename),
            'hash': md5hash  
        }
        result = dbfiles.insert_one(fileentry)
        return make_response({'msg': "success", 'url': f"https://{SERVER_IP}:8000/{md5hash}"}, 201)

    return make_response({'msg': "failed"}, 500)

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
