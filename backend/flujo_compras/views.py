from django.shortcuts import render
from django.http import HttpResponse
import environ
env = environ.Env()
environ.Env.read_env()
from utils import get_db_handle
# Create your views here.

def index(request):
    db, client = get_db_handle(env('COLLECTION_NAME'), env('HOSTNAME'))
    collection = db['almacenes']
    
    person = {'name': 'Sammy', 'sub_inventory': 'uwu'}
    collection.insert(person)
    return HttpResponse('First view xd')


