from django.urls import path
from . import views

urlpatterns = [path('warehouse', views.warehouse,name='warehouse'),]

