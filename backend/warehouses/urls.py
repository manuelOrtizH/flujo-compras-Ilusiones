from django.urls import path
from . import views

urlpatterns = [path('get_warehouse/', views.get_warehouse,name='get_warehouse'),
               path('create_warehouse/', views.create_warehouse,name='create_warehouse'),]

