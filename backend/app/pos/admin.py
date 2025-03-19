from django.contrib import admin
from .models import PointsSales, StoreInfo

class StoreInfoInline(admin.StackedInline):
    model = StoreInfo
    can_delete = False
    verbose_name_plural = 'Информация о магазине'
    fieldsets = (
        ('Контактная информация', {
            'fields': ('phone', 'email', 'working_hours')
        }),
        ('Социальные сети', {
            'fields': ('socialName', 'socialAcc', 'socialLink'),
            'classes': ('collapse',)
        }),
    )

@admin.register(StoreInfo)
class StoreInfoAdmin(admin.ModelAdmin):
    list_display = ('store', 'phone', 'email', 'working_hours', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('store__name', 'phone', 'email')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Основная информация', {
            'fields': ('store', 'phone', 'email', 'working_hours')
        }),
        ('Социальные сети', {
            'fields': ('socialName', 'socialAcc', 'socialLink'),
            'classes': ('collapse',)
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(PointsSales)
class PointsSalesAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'city', 'address', 'is_points', 'created_at', 'updated_at')
    list_filter = ('is_points', 'country', 'city', 'created_at', 'updated_at')
    search_fields = ('name', 'country', 'city', 'address')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'country', 'city', 'address', 'is_points')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [StoreInfoInline]