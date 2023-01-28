from djongo import models

# Create your models here.
class Inventory(models.Model):
    pass

class Order(models.Model):
    pass

class Warehouse(models.Model): #Almacenes
    name = models.CharField(max_length=100)
    sub_inventory = models.CharField(max_length=250)
    # inventories = models.ArrayReferenceField(to=Inventory, on_delete=models.CASCADE)
    # orders = models.ArrayReferenceField(to=Order, on_delete=models.CASACADE)




