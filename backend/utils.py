from pymongo import MongoClient
import environ
import json
from bson import json_util

def get_db_handle(db_name):
    env = environ.Env()
    environ.Env.read_env()
    client = MongoClient(host=env('HOSTNAME'), connect=False)
    db = client[db_name]
    return db,client

def parse_json(data):
    return json.loads(json_util.dumps(data))