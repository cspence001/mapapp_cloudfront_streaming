import boto3

def get_parameters(key):
    ssm_client = boto3.client('ssm',
    region_name = "us-east-1"
    )
    response = ssm_client.get_parameter(
        Name = key, WithDecryption=False
    )
    return response['Parameter']['Value']

rsa_param = 'SOCKET00'
rsa_f = get_parameters(rsa_param)

pub_param = 'PUBID_00'
pub_id = get_parameters(pub_param)

url_param = 'CF_URL_PARAM'
url_id = get_parameters(url_param)

