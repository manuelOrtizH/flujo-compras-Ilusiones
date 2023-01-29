from pymongo import MongoClient
import environ
import json
import openpyxl
import pandas as pd
import boto3
from io import BytesIO
import openpyxl
from bson import json_util

def get_db_handle(db_name: str) -> dict:
    '''
    Obtain the database from the MongoDB Cluster
    Keep as environment variables the host of the MongoDB Cluster
    db_name: name of the database of the MongoDB Cluster
    '''
    env = environ.Env()
    environ.Env.read_env()
    client = MongoClient(host=env('HOSTNAME'), connect=False)
    db = client[db_name]
    return db

def parse_json(data: dict)-> object:
    '''
    Parse the data given by an endpoint and return it as json
    data: data provided by MongoDB 
    '''
    return json.loads(json_util.dumps(data))

def file_handler(filename: str) -> bool:
    '''
    Verify the data in the xlsx file is correct. And retrieve the file from the S3 bucket
    Notice you should have the environment variables in your computer
    filename: name of the file to retrieve from the S3 bucket
    Returns if the file is not valid
    '''
    client = boto3.client('s3')
    COLS_NAMES = ('Sub inventario', 'PDV', 'TOTAL') 
    file = client.get_object(
        Bucket="m2crowd-ilusiones-bucket1",
        Key=f'ordenes-de-compra/{filename}'
    )

    binary_data = file['Body'].read()
    wb = openpyxl.load_workbook(BytesIO(binary_data),data_only=True)
    data = wb['Hoja1'].values
    df = pd.DataFrame(data, columns=next(data)[0:])
    cols = df.columns.values
    if (any(pd.isnull(cols)) or (cols[0], cols[1], cols[-1]) != COLS_NAMES): #Check for any null value
        return False
    return True