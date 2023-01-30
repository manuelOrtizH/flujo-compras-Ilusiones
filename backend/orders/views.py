from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, upload_file
from warehouses.models import Warehouse
from warehouses.views import get_warehouse
from products.models import Inventory
from django.views.decorators.csrf import csrf_exempt
import json
import boto3
from utils import file_handler, parse_json
import pandas as pd
import openpyxl

# Create your views here.
@require_http_methods(['GET'])
def check_sub_inventory(_sub_inventory: str, db: dict) -> bool:
    collection = db['warehouses']
    res = list(collection.find({'sub_inventory': _sub_inventory}))
    return False if not res else True


@csrf_exempt
@require_http_methods(['POST']) 
def create_order(request) -> HttpResponse:
    db = get_db_handle('ilusiones_db')
    collection = db['orders']
    data = json.loads(request.body)
    filename = data['filename']
    is_file_valid,df = file_handler(filename, root='ordenes-de-compra')
    is_unique_sub_inventory_col = lambda col: len(col.unique()) == len(col)
    if not is_file_valid and not is_unique_sub_inventory_col(df.iloc[:,0]):
        return HttpResponse(json.dumps({'status': 404, 'message': 'The file is not valid'}))
    
    df.reset_index()
    cols = df.columns.values
    for _, col in df.iterrows():
        sub_inventory, pdv = col[0], col[1]
        if check_sub_inventory(sub_inventory, db) or col[2]!='CERRADA POR CAMBIO DE LOCAL NO REALIZAR ENVIOS':
            workbook = openpyxl.Workbook()
            sheet = workbook.active
            sheet['A1'], sheet['B1'] = f'Inventario: ', sub_inventory
            sheet['A2'], sheet['B2'] = f'Cliente: ', pdv
            for j,sku in enumerate(col[2:-1],2):
                if not sku:
                    sheet[f'A{j+1}'], sheet[f'B{j+1}'] = cols[j], sku
                
            workbook.save(filename=f'{sub_inventory}.xlsx')
            try:
                pass
                #upload_file()
                #update_orders()
            except Exception e:
                pass


    return HttpResponse(json.dumps({'status': 200, 'message': 'uwu'}))