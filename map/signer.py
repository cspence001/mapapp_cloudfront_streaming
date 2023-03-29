import datetime
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from botocore.signers import CloudFrontSigner
import param as param 

def rsa_signer(message):
    key_file = param.rsa_f.encode() #PEM-encoded RSA key /TraditionalOpenSSL
    #with open(rsa_k, 'rb') as key_file:
    private_key = serialization.load_pem_private_key(
        key_file, 
        password=None,
        backend=default_backend()
    )
    signature = private_key.sign(message, padding.PKCS1v15(), hashes.SHA1())
    return signature

def get_cloudfront_signer_instance():
    pub_k = param.pub_id
    print(pub_k)
    cloudfront_signer = CloudFrontSigner(pub_k, rsa_signer)
    return cloudfront_signer

def cloudfront_sign(uri, expires_hours=1):
    expire_date = datetime.datetime.utcnow() + datetime.timedelta(hours=expires_hours)
    cloudfront_signer_instance = get_cloudfront_signer_instance()
    url_base = f"{param.url_id}"
    print(url_base)
    if uri.startswith('/'):
        uri = uri[1:]
    url = f"{url_base}{uri}"
    signed_url = cloudfront_signer_instance.generate_presigned_url( 
        url, date_less_than=expire_date)
    #print(signed_url)
    return signed_url

