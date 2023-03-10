from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, upload_file
from orders.models import Order
from django.views.decorators.csrf import csrf_exempt
import json
from utils import file_handler, update_list, is_warehouse_in_db
import openpyxl
import math
import os
# Create your views here.


@csrf_exempt
@require_http_methods(['POST']) 
def create_order(request) -> HttpResponse:
    '''
    Creation and reading of the purchase order plus updating the warehouse list of orders
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['orders']
    data = json.loads(request.body)
    filename = data['filename']
    is_file_valid,df = file_handler(filename, root='ordenes-de-compra')
    is_unique_sub_inventory_col = lambda col: len(col.unique()) == len(col)
    if not is_file_valid and not is_unique_sub_inventory_col(df.iloc[:,0]):
        return HttpResponseBadRequest(json.dumps({'status': 404, 'message': 'The file is not valid'}))
    
    df.reset_index()
    cols = df.columns.values
    for _, col in df.iterrows():
        sub_inventory, pdv = col[0], col[1]
        if is_warehouse_in_db(sub_inventory) and not isinstance(col[2], str):
            workbook = openpyxl.Workbook()
            sheet = workbook.active
            sheet['A1'], sheet['B1'] = f'Inventario: ', sub_inventory
            sheet['A2'], sheet['B2'] = f'Cliente: ', pdv
            j = 2
            for sku in col[2:-1]:
                if sku and not math.isnan(float(sku)):
                    sheet[f'A{j+1}'] = cols[j]
                    sheet[f'B{j+1}'] = sku
                    j+=1
            filename=f'{sub_inventory}.xlsx'
            workbook.save(filename=filename)
            try:
                upload_file(filename,root=f'ordenes-de-compra/{filename}')
            except Exception as e:
                return HttpResponseBadRequest(json.dumps({'status': 404, 'body': 'An error occurred when uploading the file', 'error': e}))

            os.remove(filename)
            order_obj = Order()
            try:
                order_obj.file = f"s3://m2crowd-ilusiones-bucket1/ordenes-de-compra/{filename}"
            except Exception as e:
                return HttpResponseBadRequest(json.dumps({'status': 404, 'body': 'An error occurred with the given data','error': e}))
            
            collection.insert({
                'date': order_obj.date,
                'file': order_obj.file
            })

            update_list(collection_to_update='warehouses', 
                        list_to_update='orders', 
                        type_id='date', 
                        id=order_obj.date, 
                        collection_id=sub_inventory,
                        collection_type='sub_inventory')

    return HttpResponse(
            json.dumps(
            {   'status': 201, 
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST'
            },'message': 'The file has been succesfully read and the orders were succesfully created'}))

