from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, parse_json
from .models import Warehouse, Order, Inventory
from django.views.decorators.csrf import csrf_exempt
import json
import boto3

# Create your views here.
@csrf_exempt
@require_http_methods(['GET', 'POST'])
def warehouse(request):
    db, client = get_db_handle('ilusiones_db')
    collection = db['warehouses']

    if (request.method == 'GET'):
        _sub_inventory = request.GET['sub_inventory']
        res = list(collection.find({'sub_inventory': _sub_inventory}))
        if not res: return HttpResponse(json.dumps({'status': 404, 'message': 'Record not found'}))
        
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

    
    if (request.method == 'POST'):
        data = json.loads(request.body)
        _sub_inventory = data['sub_inventory']
        res = collection.find({'sub_inventory': _sub_inventory})
        if not list(res):
            warehouse_obj = Warehouse
            try:
                warehouse_obj.name = data['name']
                warehouse_obj.sub_inventory = data['sub_inventory']
                warehouse_obj.orders = []
                warehouse_obj.inventories = []
            except Exception as e:
                return HttpResponse(json.dumps({'status': 404, 'message': 'An error occurred with the given data'}))
            
            collection.insert({
                'name': warehouse_obj.name,
                'sub_inventory': warehouse_obj.sub_inventory,
                'orders': [],
                'inventories': []
            })
            return HttpResponse(json.dumps({ 'status': 201, 'message': 'The record has been succesfully created'}))
            
        return HttpResponse(json.dumps({'status': 404, 'message': 'Record already exists'}))
        
        

    


