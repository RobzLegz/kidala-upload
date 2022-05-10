from flask import Flask, request, flash, redirect, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

UPLOAD_FOLDER = app.root_path + '\\files'

@app.route("/")
def hello_world():
    return "<p>Hello, World</p>"

@app.route("/<filename>")
def downloadFile(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename))

@app.route('/upload', methods=['POST'])
def upload():

    if 'file' not in request.files:
            flash('No file part')
            return {'msg': "failed"}

    file = request.files['file']
    print(file.filename)
    if file.filename == '':
            flash('No selected file')
            return {'msg': "failed"}
    if file:
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
        return {'msg': "success", 'url': f"http://localhost:5000/{file.filename}"}

    return {'msg': "failed"}

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
