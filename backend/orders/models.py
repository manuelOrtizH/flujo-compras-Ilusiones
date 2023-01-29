from django.db import models
from djongo import models
from datetime import date
# Create your models here.
class Order(models.Model): #Ordenes de compras
    date = models.DateField(default=date.today())
    file = models.URLField() #S3 file