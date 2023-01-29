from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle
from warehouses.models import Warehouse
from products.models import Inventory
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
from utils import file_handler
import pandas as pd

# Create your views here.
@csrf_exempt
@require_http_methods(['POST']) 
def create_order(request) -> HttpResponse:
    db = get_db_handle('ilusiones_db')
    collection = db['orders']
    data = json.loads(request.body)
    filename = data['filename']
    print(file_handler(filename))
    if not file_handler(filename):
        return HttpResponse(json.dumps({'status': 404, 'message': 'The file is not valid'}))
    return HttpResponse(json.dumps({'status': 200, 'message': 'Success'}))