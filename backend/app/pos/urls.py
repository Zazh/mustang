from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PointsSalesViewSet

router = DefaultRouter()
router.register(r'', PointsSalesViewSet, basename='pointssales')

urlpatterns = [
    path('', include(router.urls)),
]