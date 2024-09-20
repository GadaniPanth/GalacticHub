from rest_framework import serializers
from .models import *

class MyModelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModels
        fields = ['id', 'name', 'data']
