# services.py
from .models import PointsSales, StoreInfo
from django.shortcuts import get_object_or_404
from typing import List, Optional, Dict, Any
from django.db.models import Q

class PointsSalesService:
    @staticmethod
    def get_store_detail(store_id: int) -> PointsSales:
        """Получить детальную информацию о магазине"""
        return get_object_or_404(
            PointsSales.objects.select_related('info'),
            id=store_id
        )

    @staticmethod
    def list_all_stores() -> List[PointsSales]:
        """Получить список всех магазинов"""
        return PointsSales.objects.select_related('info').all()

    @staticmethod
    def get_stores_by_country(country: str) -> List[PointsSales]:
        """Получить список магазинов по стране"""
        return PointsSales.objects.select_related('info').filter(
            country__iexact=country
        )

    @staticmethod
    def get_stores_by_city(city: str) -> List[PointsSales]:
        """Получить список магазинов по городу"""
        return PointsSales.objects.select_related('info').filter(
            city__iexact=city
        )

    @staticmethod
    def get_stores_by_country_and_city(country: str, city: str) -> List[PointsSales]:
        """Получить список магазинов по стране и городу"""
        return PointsSales.objects.select_related('info').filter(
            country__iexact=country,
            city__iexact=city
        )

    @staticmethod
    def get_cities_by_country(country: str) -> List[str]:
        """Получить список городов по стране"""
        return list(PointsSales.objects.filter(
            country__iexact=country,
            city__isnull=False
        ).values_list('city', flat=True).distinct().order_by('city'))

    @staticmethod
    def get_all_cities() -> List[str]:
        """Получить список всех городов"""
        return list(PointsSales.objects.filter(
            city__isnull=False
        ).values_list('city', flat=True).distinct().order_by('city'))

    @staticmethod
    def get_countries() -> List[str]:
        """Получить список всех стран"""
        return list(PointsSales.objects.filter(
            country__isnull=False
        ).values_list('country', flat=True).distinct().order_by('country'))

    @staticmethod
    def create_store(data: Dict[str, Any]) -> PointsSales:
        """Создать новый магазин"""
        store_data = {
            'name': data.get('name'),
            'country': data.get('country'),
            'city': data.get('city'),
            'address': data.get('address'),
            'is_points': data.get('is_points', True)
        }
        store = PointsSales.objects.create(**store_data)
        
        if 'info' in data:
            info_data = data['info']
            StoreInfo.objects.create(store=store, **info_data)
        
        return store

    @staticmethod
    def update_store(store_id: int, data: Dict[str, Any]) -> PointsSales:
        """Обновить информацию о магазине"""
        store = PointsSalesService.get_store_detail(store_id)
        
        # Обновляем основные данные магазина
        store_data = {
            'name': data.get('name', store.name),
            'country': data.get('country', store.country),
            'city': data.get('city', store.city),
            'address': data.get('address', store.address),
            'is_points': data.get('is_points', store.is_points)
        }
        
        for key, value in store_data.items():
            setattr(store, key, value)
        store.save()
        
        # Обновляем дополнительную информацию
        if 'info' in data:
            info_data = data['info']
            info, created = StoreInfo.objects.get_or_create(store=store)
            for key, value in info_data.items():
                setattr(info, key, value)
            info.save()
        
        return store

    @staticmethod
    def delete_store(store_id: int) -> bool:
        """Удалить магазин"""
        store = PointsSalesService.get_store_detail(store_id)
        store.delete()
        return True

    @staticmethod
    def get_store_phones(store_id: int) -> List[str]:
        """Получить список телефонов магазина"""
        store = PointsSalesService.get_store_detail(store_id)
        if store.info and store.info.phone:
            return [phone.strip() for phone in store.info.phone.split('\n') if phone.strip()]
        return []

    @staticmethod
    def create_point(serializer):
        serializer.save()

    @staticmethod
    def update_point(serializer):
        serializer.save()