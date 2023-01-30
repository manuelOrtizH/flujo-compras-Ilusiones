from djongo import models
from orders.models import Order
from products.models import Inventory
# Create your models here.

class Warehouse(models.Model): #Almacenes
    name = models.CharField(max_length=100)
    sub_inventory = models.CharField(max_length=250)
    inventories = models.ArrayReferenceField(to=Inventory, on_delete=models.CASCADE)
    orders = models.ArrayReferenceField(to=Order, on_delete=models.CASCADE)

