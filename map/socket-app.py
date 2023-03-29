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

# @app.route('/datava')
# def datava():  
#     s3 = boto3.resource('s3')
#     s3_obj = s3.Object(bucket_name='crypto-senti-nb', key='va/va_gdf_fips_point.json')
#     response = s3_obj.get()
#     datava= response['Body'].read()
#     return datava

@app.route('/datava')
def datava():
    datava = 'https://d1zlfveg9fgpls.cloudfront.net/va/va_gdf_fips_point.json'
    req = requests.get(datava)
    return req.content

@app.route('/datamd')
def datamd():
    datamd = 'https://d1zlfveg9fgpls.cloudfront.net/md/md_gdf_fips_point.json'
    req = requests.get(datamd)
    return req.content

@app.route('/datail')
def datail():
    datail= 'https://d1zlfveg9fgpls.cloudfront.net/IL_gpd/il_gdf_fips_point.json'
    req = requests.get(datail)
    return req.content
    
#state
# @app.route('/statedata')
# def statedata():
#     vastate = 'https://d1zlfveg9fgpls.cloudfront.net/va/va_gpd_state_merge.json'
#     req = requests.get(vastate)
#     return req.content

#county
@app.route('/vacountydata')
def vacountydata():
    vacounty = 'https://d1zlfveg9fgpls.cloudfront.net/va/va_gpd_county_merge.json'
    req = requests.get(vacounty)
    return req.content

@app.route('/mdcountydata')
def mdcountydata():
    mdcounty = 'https://d1zlfveg9fgpls.cloudfront.net/md/md_gpd_county_merge.json'
    req = requests.get(mdcounty)
    return req.content

@app.route('/ilcountydata')
def ilcountydata():
    ilcounty = 'https://d1zlfveg9fgpls.cloudfront.net/IL_gpd/il_gpd_county_merge.json'
    req = requests.get(ilcounty)
    return req.content

#blockgroup
@app.route('/vablockgroup')
def vablockgroup():
    vabg ='https://d1zlfveg9fgpls.cloudfront.net/va/va_gpd_blockgroup_merge.json'
    req = requests.get(vabg)
    return req.content

@app.route('/mdblockgroup')
def mdblockgroup():
    mdbg = 'https://d1zlfveg9fgpls.cloudfront.net/md/md_gpd_blockgroup_merge.json'
    req = requests.get(mdbg)
    return req.content

@app.route('/ilblockgroup')
def ilblockgroup():
    ilbg ='https://d1zlfveg9fgpls.cloudfront.net/IL_gpd/il_gpd_blockgroup_merge.json'
    req = requests.get(ilbg)
    return req.content
#block
@app.route('/vablock')
def vablock():
    vab = 'https://d1zlfveg9fgpls.cloudfront.net/va/va_gpd_block_merge.json'
    req = requests.get(vab)
    return req.content

@app.route('/mdblock')
def mdblock():
    mdb = 'https://d1zlfveg9fgpls.cloudfront.net/md/md_gpd_block_merge.json'
    req = requests.get(mdb)
    return req.content

@app.route('/ilblock')
def ilblock():
    ilb = 'https://d1zlfveg9fgpls.cloudfront.net/IL_gpd/il_gpd_block_merge.json'
    req = requests.get(ilb)
    return req.content

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
    # from waitress import serve
    # serve(app, host="0.0.0.0", port=8080)