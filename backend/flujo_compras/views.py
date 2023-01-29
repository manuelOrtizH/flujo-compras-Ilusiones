from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.forms.models import model_to_dict
from bson.objectid import ObjectId
from django.views.decorators.http import require_http_methods
from utils import get_db_handle, parse_json
from .models import Warehouse
import json

# Create your views here.
@require_http_methods(['GET', 'POST'])
def warehouse(request):
    db, client = get_db_handle('ilusiones_db')
    collection = db['warehouses']
    return HttpResponse('View')
    

        
        

    


