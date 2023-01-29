from djongo import models

# Create your models here.
class Inventory(models.Model): #Inventario
    model = models.CharField(max_length=200)
    invoice = models.CharField(max_length=50)
    imei = models.CharField(max_length=25)