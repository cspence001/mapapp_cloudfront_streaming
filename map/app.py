import os, io
from flask import Flask, render_template, request
import param as param
import signer as signer
import requests
import boto3

app = Flask(__name__)
s3 = boto3.resource('s3')

@app.route("/", endpoint='index')
def home():
    return render_template("index.html")

@app.route('/<path:subpath>')
def data(subpath):
    file = param.get_parameters(subpath)
    sign = signer.cloudfront_sign(file)
    print(sign)
    req = requests.get(sign)
    print(req)
    return req.content

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False)
    #from waitress import serve
    #serve(app, host="0.0.0.0", port=8080)