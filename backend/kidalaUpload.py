from flask import Flask, request, flash, redirect, send_file
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World</p>"

@app.route("/<filename>")
def downloadFile(filename):
    return send_file(os.path.join(r"C:\Users\Piparkuucinsh\Desktop\mantas8\kidala-upload\files", filename), as_attachment=True)

@app.route('/upload', methods=['POST'])
def upload():

    if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)

    file = request.files['file']
    print(file.filename)
    if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
    if file:
        file.save(os.path.join(r"C:\Users\Piparkuucinsh\Desktop\mantas8\kidala-upload\files", file.filename).replace("PNG", "png"))
        return f"localhost:5000/{file.filename}"

    return "poh"

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=False)
