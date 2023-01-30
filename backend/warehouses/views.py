from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, parse_json
from .models import Warehouse, Order, Inventory
from django.views.decorators.csrf import csrf_exempt
import json
import datetime

# Create your views here.
@require_http_methods(['GET'])    
def get_warehouse(request) -> HttpResponse:
    '''
    Endpoint to get one warehouse by the sub_inventory from the MongoDB Cluster database
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['warehouses']
    sub_inventory = request.GET['sub_inventory']
    res = list(collection.find({'sub_inventory': sub_inventory}))
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

@csrf_exempt
@require_http_methods(['POST']) 
def create_warehouse(request) -> HttpResponse:
    '''
    Endpoint to validate and create one warehouse and insert it into the MongoDB Cluster database
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['warehouses']
    data = json.loads(request.body)
    sub_inventory = data['sub_inventory']
    res = collection.find({'sub_inventory': sub_inventory})
    if not list(res):
        warehouse_obj = Warehouse
        try:
            warehouse_obj.name = data['name']
            warehouse_obj.sub_inventory = data['sub_inventory']
            warehouse_obj.orders = []
            warehouse_obj.inventories = []
        except Exception as e:
            return HttpResponse(
                json.dumps(
                    {   'status': 404, 
                        'headers': {
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST'
                    },
                        'message': 'An error occurred with the given data'}))
        
        collection.insert({
            'name': warehouse_obj.name,
            'sub_inventory': warehouse_obj.sub_inventory,
            'orders': [],
            'inventories': []
        })
        return HttpResponse(
                json.dumps(
                {   'status': 201, 
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST'
                },'message': 'The record has been succesfully created'}))
        
    return HttpResponse(
            json.dumps(
                {   'status': 404,                 
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST'
                }, 'message': 'Record already exists'}))



@require_http_methods(['GET','PUT']) 
def update_orders(date_created: datetime, sub_inventory: str) -> HttpResponse:
    '''
    Whenever a order is created, update the warehouse by adding to the array the order added
    date_created: unique date of creation of the order
    sub_inventory: unique sub inventory to retrieve a warehouse
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['orders']

    res = list(collection.find({'date': date_created}))
    collection = db['warehouses']
    try: 
        collection.update({'sub_inventory': sub_inventory}, {"$push": {'orders': res[0]['_id']}})
    except Exception as e:
        return HttpResponse(
            json.dumps(
                {   'status': 404,                 
                    'headers': {
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'PUT'
                }, 'message': 'There was a failure with the update'}))
    
@require_http_methods(['GET', 'PUT'])
def add_inventory(sub_inventory):
    pass
