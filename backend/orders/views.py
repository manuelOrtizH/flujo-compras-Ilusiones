from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, parse_json
from warehouses.models import Warehouse
from receptions.models import Inventory
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
from io import BytesIO
import openpyxl


# Create your views here.
def file_handler(filename):
    client = boto3.client('s3')

    file = client.get_object(
        Bucket="m2crowd-ilusiones-bucket1",
        Key=f'ordenes-de-compra/{filename}'
    )
    # Check if the file is valid
    binary_data = file['Body'].read()
    wb = openpyxl.load_workbook(BytesIO(binary_data),data_only=True)
    sheet = wb.active
    col_one, col_two = (sheet[1][0:2])
    if (col_one.value != "Sub inventario" and col_two.value != "PDV"):
        return HttpResponse(json.dumps({'status': 404, 'message': 'The file is not valid'}))
    else:
        print(col_one.value, col_two.value)
        print(help(client.get_object))

    

@csrf_exempt
@require_http_methods(['POST']) 
def create_order(request):
    db, client = get_db_handle('ilusiones_db')
    collection = db['orders']
    data = json.loads(request.body)
    filename = data['filename']
    file_handler(filename)
    return HttpResponse()
