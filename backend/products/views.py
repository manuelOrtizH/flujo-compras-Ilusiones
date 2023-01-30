from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from utils import get_db_handle
from django.views.decorators.csrf import csrf_exempt
import json
from warehouses.views import add_inventory
from .models import Product
from utils import file_handler, parse_json, is_imei_unique
# Create your views here.
@require_http_methods(['GET','PUT'])
def update_inventory(db,imei,sub_inventory):
    collection = db['products']
    res = collection.find({'imei': imei})
    collection = db['inventories']
    try: 
        collection.update({'name': sub_inventory}, {"$push": {'products': res[0]['_id']}})
    except Exception as e:
        return HttpResponse(json.dumps({'status': 404, 'body': 'There was a failure with the update'}))
    

@csrf_exempt
@require_http_methods(['POST', 'PUT'])
def create_product(request) -> HttpResponse:
    '''
    Obtain products from file and store the products in their respective inventories
    Plus, adding this inventories to warehouses
    '''
    db = get_db_handle('ilusiones_db')
    collection = db['products']
    res = list(collection.find())
    data = json.loads(request.body)
    filename = data['filename']
    is_file_valid,df = file_handler(filename, root='recepcion-mercancia')
    print(res)
    if not is_file_valid:
        return HttpResponse(json.dumps({'status': 404, 'body': 'The file is not valid'}))

    df.reset_index()
    for _, col in df.iterrows():
        sub_inventory = col[0]
        model, imei, invoice = (col[2:])
        product_obj = Product()
        try:
            product_obj.model = model
            product_obj.imei = imei
            product_obj.invoice = invoice
        except Exception as e:
            return HttpResponse(json.dumps({'status': 404, 'body': 'An error occurred with the data'}))

        if is_imei_unique(imei=imei, catalogue=res):
            collection.insert({
                'model': product_obj.model,
                'invoice': product_obj.invoice,
                'imei': product_obj.imei
            })

        update_inventory(db,imei=imei, sub_inventory=sub_inventory)
        # add_inventory(sub_inventory=sub_inventory)

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
        return HttpResponse(json.dumps({'status': 404, 'message': 'Record not found'}))
        
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
