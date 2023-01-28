from django.shortcuts import render
from django.http import HttpResponse
from django.forms.models import model_to_dict
import environ
from rest_framework.decorators import api_view
env = environ.Env()
environ.Env.read_env()
from utils import get_db_handle
from .models import Warehouse
# Create your views here.
def warehouse(request):
    return HttpResponse('View test')


