from pymongo import MongoClient

def get_db_handle(db_name,host):

    client = MongoClient(host=host, connect=False)
    db = client[db_name]
    return db,client