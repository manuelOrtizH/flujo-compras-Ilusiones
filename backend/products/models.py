from djongo import models

# Create your models here.
class Product(models.Model):
    model = models.CharField(max_length=200)
    invoice = models.CharField(max_length=50)
    imei = models.CharField(max_length=25)

class Inventory(models.Model): #Inventario
    name = models.CharField(max_length=100)
    products = models.ArrayReferenceField(to=Product, on_delete=models.CASCADE)