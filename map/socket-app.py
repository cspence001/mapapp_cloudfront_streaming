import os, boto3,io
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit
import requests

app = Flask(__name__)
s3 = boto3.resource('s3')
socketio = SocketIO(app)

@app.route("/", endpoint='index')
def home():
    return render_template("index.html")

@socketio.on('my event')
def test_message(message):
    emit('my response', {'data': message['data']})

@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Connected'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)