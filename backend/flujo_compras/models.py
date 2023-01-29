from djongo import models
from datetime import date
# Create your models here.
class Inventory(models.Model): #Inventario
    model = models.CharField(max_length=200)
    invoice = models.CharField(max_length=50)
    imei = models.CharField(max_length=25)

class Order(models.Model): #Ordenes de compras
    date = models.DateField(default=date.today())
    file = models.URLField() #S3 file

class Warehouse(models.Model): #Almacenes
    name = models.CharField(max_length=100)
    sub_inventory = models.CharField(max_length=250)
    inventories = models.ArrayReferenceField(to=Inventory, on_delete=models.CASCADE)
    orders = models.ArrayReferenceField(to=Order, on_delete=models.CASCADE)




