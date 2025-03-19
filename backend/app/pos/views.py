from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PointsSales
from .serializers import PointsSalesSerializer, LocationSerializer
from .services import PointsSalesService

# Create your views here.

class PointsSalesViewSet(viewsets.ModelViewSet):
    queryset = PointsSales.objects.all()
    serializer_class = PointsSalesSerializer

    def get_queryset(self):
        country = self.request.query_params.get('country', None)
        city = self.request.query_params.get('city', None)
        
        print(f"Filtering by city: {city}")
        if country and city:
            queryset = PointsSalesService.get_stores_by_country_and_city(country, city)
        elif country:
            queryset = PointsSalesService.get_stores_by_country(country)
        elif city:
            queryset = PointsSalesService.get_stores_by_city(city)
        else:
            queryset = PointsSalesService.list_all_stores()
            
        print(f"Found stores: {list(queryset.values('id', 'city'))}")
        return queryset

    @action(detail=False, methods=['get'])
    def locations(self, request):
        """Получить список стран и городов"""
        country = request.query_params.get('country', None)
        
        if country:
            cities = PointsSalesService.get_cities_by_country(country)
            return Response({
                'cities': [{'value': city, 'label': city} for city in cities]
            })
        else:
            countries = PointsSalesService.get_countries()
            return Response({
                'countries': [{'value': country, 'label': country} for country in countries]
            })

    @action(detail=False, methods=['get'])
    def countries(self, request):
        """Получить список всех стран"""
        countries = PointsSalesService.get_countries()
        serializer = LocationSerializer(
            [{'value': country, 'label': country} for country in countries],
            many=True
        )
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cities(self, request):
        """Получить список городов"""
        country = request.query_params.get('country', None)
        
        if country:
            cities = PointsSalesService.get_cities_by_country(country)
        else:
            cities = PointsSalesService.get_all_cities()
            
        serializer = LocationSerializer(
            [{'value': city, 'label': city} for city in cities],
            many=True
        )
        return Response(serializer.data)
