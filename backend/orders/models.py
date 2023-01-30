from django.db import models
from djongo import models
import datetime
# Create your models here.
class Order(models.Model): #Ordenes de compras
    date = models.DateField(default=datetime.datetime.today())
    file = models.URLField() #S3 file