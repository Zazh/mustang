# serializers.py
from rest_framework import serializers
from .models import PointsSales, StoreInfo
from django.conf import settings

class LocationSerializer(serializers.Serializer):
    """Сериализатор для списков городов и стран"""
    value = serializers.CharField()
    label = serializers.CharField()

class StoreInfoSerializer(serializers.ModelSerializer):
    phones = serializers.SerializerMethodField()
    
    class Meta:
        model = StoreInfo
        fields = [
            'phones', 'email', 'socialName', 'socialAcc', 
            'socialLink', 'working_hours'
        ]
    
    def get_phones(self, obj):
        if obj.phone:
            return [phone.strip() for phone in obj.phone.split('\n') if phone.strip()]
        return []

class PointsSalesSerializer(serializers.ModelSerializer):
    info = StoreInfoSerializer(required=False)
    
    class Meta:
        model = PointsSales
        fields = [
            'id', 'name', 'country', 'city', 'address', 
            'is_points', 'info', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def validate(self, data):
        if 'info' in data and 'email' in data['info']:
            email = data['info']['email']
            if email and not email.strip():
                raise serializers.ValidationError("Email cannot be empty")
        return data

    def create(self, validated_data):
        info_data = validated_data.pop('info', None)
        store = PointsSales.objects.create(**validated_data)
        
        if info_data:
            StoreInfo.objects.create(store=store, **info_data)
        
        return store

    def update(self, instance, validated_data):
        info_data = validated_data.pop('info', None)
        
        # Обновляем основные данные магазина
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Обновляем или создаем информацию о магазине
        if info_data:
            info, created = StoreInfo.objects.get_or_create(store=instance)
            for attr, value in info_data.items():
                setattr(info, attr, value)
            info.save()
        
        return instance
