from pymongo import MongoClient
import environ
import openpyxl
import pandas as pd
import boto3
from io import BytesIO
import openpyxl

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

def file_handler(filename: str, root: str) -> bool or pd.DataFrame:
    '''
    Verify the data in the xlsx file is correct. And retrieve the file from the S3 bucket
    Notice you should have the environment variables in your computer
    filename: name of the file to retrieve from the S3 bucket
    root: name of the folder root where the file is stored in S3 bucket
    Returns if the file is not valid
    '''
    client = boto3.client('s3')
    
    file = client.get_object(
        Bucket="m2crowd-ilusiones-bucket1",
        Key=f'{root}/{filename}'
    )

    binary_data = file['Body'].read()
    wb = openpyxl.load_workbook(BytesIO(binary_data),data_only=True)
    data = wb['Hoja1'].values
    df = pd.DataFrame(data, columns=next(data)[0:])
    if (any(pd.isnull(df.columns.values))): #Check for any null value
        return False
    return True,df

def upload_file(filename: str, root: str):
    '''
    Upload the new xlsx files generated to S3 bucket
    filename: name of the file we want to upload
    
    '''
    client = boto3.client('s3')
    with open(filename, 'rb') as f:
        client.upload_fileobj(f, 'm2crowd-ilusiones-bucket1', root)





def update_list(**data):
    '''
    Method to update a list based on the next values:
    data: {
        collection_to_update: name of the collection where the list will be updated
        list_to_update: name of the collection thath should be added to a list
        id: the value we want to match
        type_id: name of the attribute to find the record we want to add to the list
        collection_id: the value we want to match from the collection to update
        collection_type: name of the attribute to find collection we want to update
    }
    '''
    db = get_db_handle('ilusiones_db')
    collection = db[data.get('list_to_update')]

    res = list(collection.find({data.get('type_id'): data.get('id')}))
    collection = db[data.get('collection_to_update')]
    try: 
        collection.update({data.get('collection_type'): data.get('collection_id')}, 
                         {"$push": {data.get('list_to_update'): res[0]['_id']}})
    except Exception as e:
        return e
    
def is_warehouse_in_db(sub_inventory: str) -> bool:
    '''
    Check if a warehouse exists or not based on the unique sub_inventory
    sub_inventory: identifier of a warehouse
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['warehouses']
    res = list(collection.find({'sub_inventory': sub_inventory}))
    return False if not res else True