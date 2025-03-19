from django.db import models
from django.utils.translation import gettext_lazy as _

class PointsSales(models.Model):
    name = models.CharField(max_length=255, verbose_name=_("Points Name"))

    country = models.CharField(blank=True, null=True, verbose_name=_("Country"))
    city = models.CharField(blank=True, null=True, verbose_name=_("City"))
    address = models.CharField(blank=True, null=True, verbose_name=_("Address"))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created At"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated At"))
    is_points = models.BooleanField(default=True, verbose_name=_("Is Our Points"))

    class Meta:
        verbose_name = _("Points Name")
        verbose_name_plural = _("Points Name")

    def __str__(self):
        return self.name

class StoreInfo(models.Model):
    store = models.OneToOneField(
        PointsSales,
        on_delete=models.CASCADE,
        related_name='info',
        verbose_name=_("Store")
    )
    phone = models.TextField(max_length=50, blank=True, null=False, verbose_name=_("Phone"))
    email = models.EmailField(blank=True, null=True, verbose_name=_("Email"))

    socialName = models.CharField(blank=True, null=True, verbose_name=_("Social Name"))
    socialAcc = models.CharField(blank=True, null=True, verbose_name=_("Social Acc"))
    socialLink = models.CharField(blank=True, null=True, verbose_name=_("Social Link"))

    working_hours = models.TextField(blank=True, null=True, verbose_name=_("Working Hours"))

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created At"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated At"))

    class Meta:
        verbose_name = _("Store Info")
        verbose_name_plural = _("Store Info")

    def __str__(self):
        return f"{self.store.name} Info"
