from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from utils import get_db_handle
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product
from utils import file_handler, update_list, is_warehouse_in_db
from bson import json_util, ObjectId
# Create your views here.

@csrf_exempt
@require_http_methods(['POST', 'PUT'])
def create_product(request) -> HttpResponse:
    '''
    Obtain products from file and store the products in their respective inventories
    Plus, adding this inventories to warehouses.
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['products']
    data = json.loads(request.body)
    filename = data['filename']
    is_file_valid,df = file_handler(filename, root='recepcion-mercancia')
    if not is_file_valid:
        return HttpResponseBadRequest(json.dumps({'status': 404, 'body': 'The file is not valid'}))

    df.reset_index()
    imeis_added = set()
    for _, col in df.iterrows():
        sub_inventory = col[0]
        if is_warehouse_in_db(sub_inventory):
            model, imei, invoice = (col[2:])
            product_obj = Product()
            try:
                product_obj.model = model
                product_obj.imei = imei
                product_obj.invoice = invoice
            except Exception as e:
                return HttpResponseBadRequest(json.dumps({'status': 404, 'body': 'An error occurred with the data'}))

            if imei not in imeis_added:
                collection.insert({
                    'model': product_obj.model,
                    'invoice': product_obj.invoice,
                    'imei': product_obj.imei
                })

                imeis_added.add(imei)

                update_list(collection_to_update='inventories', 
                            list_to_update='products', 
                            type_id='imei', 
                            id=product_obj.imei, 
                            collection_id=sub_inventory,
                            collection_type='name')

                
                update_list(collection_to_update='warehouses', 
                            list_to_update='inventories', 
                            type_id='name', 
                            id=sub_inventory, 
                            collection_id=sub_inventory,
                            collection_type='sub_inventory')
                

    return HttpResponse(
            json.dumps({'status': 201, 
                        'headers': {
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST'
                        },'body': 'Success'}))


@require_http_methods(['GET'])
def get_inventory(request) -> HttpResponse:
    '''
    Obtain the required inventory
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['inventories']
    name = request.GET['name']
    res = list(collection.find({'name': name}))

    if not res: 
        return HttpResponseBadRequest(json.dumps({'status': 404, 'message': 'Record not found'}))
        
    return HttpResponse(
        json.dumps(
            {   'status': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                },
                'body': json.loads(json_util.dumps(res))
            }
        )
    )

def get_products(request) -> HttpResponse:
    db = get_db_handle('ilusiones_db')
    collection = db['products']
    ids = list(map(lambda id: ObjectId(id), request.GET['ids'].split(',')))
    
    res = collection.find({'_id': {'$in': ids} })
    
    if not res: 
        return HttpResponseBadRequest(json.dumps({'status': 404, 'message': 'Record not found'}))
        
    return HttpResponse(
        json.dumps(
            {   'status': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET'
                },
                'body': json.loads(json_util.dumps(res))
            }
        )
    )