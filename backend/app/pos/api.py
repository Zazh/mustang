# api.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PointsSales
from .serializers import PointsSalesSerializer
from .services import PointsSalesService

class PointsSalesViewSet(viewsets.ModelViewSet):
    queryset = PointsSales.objects.all().order_by('-created_at')
    serializer_class = PointsSalesSerializer

    def get_queryset(self):
        return PointsSalesService.list_all_stores()

    def retrieve(self, request, *args, **kwargs):
        store = PointsSalesService.get_store_detail(kwargs['pk'])
        serializer = self.get_serializer(store)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        store = PointsSalesService.create_store(serializer.validated_data)
        serializer = self.get_serializer(store)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        store = PointsSalesService.update_store(kwargs['pk'], serializer.validated_data)
        serializer = self.get_serializer(store)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def details(self, request, pk=None):
        store = self.get_object()
        serializer = self.get_serializer(store)
        return Response(serializer.data)