from django.db import models
from django.contrib.auth.models import  AbstractUser
from django.core.exceptions import ValidationError

class MyModels(models.Model):
    name = models.CharField(unique=True, max_length=100)
    data = models.JSONField(blank=True, null=True)

    def __str__(self):
        return self.name
