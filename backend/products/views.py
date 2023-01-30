from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, upload_file
from orders.models import Order
from warehouses.views import update_orders
from django.views.decorators.csrf import csrf_exempt
import json
from utils import file_handler, parse_json
import openpyxl
import math
import os
# Create your views here.
@require_http_methods(['POST', 'GET'])
def create_product(request):
    db = get_db_handle('ilusiones_db')
    collection = db['products']

    return HttpResponse('Some response')

@require_http_methods(['GET'])
def get_inventory(request):
    db = get_db_handle('ilusiones_db')
    collection = db['inventories']
    name = request.GET['name']
    res = list(collection.find({'name': name}))

    if not res: 
        return HttpResponse(
                json.dumps(
                    {   'status': 404, 
                        'headers': {
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET'
                        }, 
                        'message': 'Record not found'}))
        
    return HttpResponse(
        json.dumps(
            {   'status': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                },
                'body': parse_json(res)
            }
        )
    )
