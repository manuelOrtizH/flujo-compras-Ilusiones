from pymongo import MongoClient
import environ
import json
import openpyxl
import pandas as pd
import boto3
from io import BytesIO
import openpyxl
from bson import json_util

def get_db_handle(db_name):
    env = environ.Env()
    environ.Env.read_env()
    client = MongoClient(host=env('HOSTNAME'), connect=False)
    db = client[db_name]
    return db,client

def parse_json(data):
    return json.loads(json_util.dumps(data))

def file_handler(filename):
    client = boto3.client('s3')
    COLS_NAMES = ('Sub inventario', 'PDV', 'TOTAL') 
    file = client.get_object(
        Bucket="m2crowd-ilusiones-bucket1",
        Key=f'ordenes-de-compra/{filename}'
    )

    # Check if the file is valid

    binary_data = file['Body'].read()
    wb = openpyxl.load_workbook(BytesIO(binary_data),data_only=True)
    data = wb['Hoja1'].values
    # Get the first line in file as a header line
    df = pd.DataFrame(data, columns=next(data)[0:])
    cols_names = df.columns.values
    if (not any(pd.isnull(cols_names)) or (cols_names[-1], cols_names[1], cols_names[-1]) != (COLS_NAMES)): #Check for any null value
        return False
    