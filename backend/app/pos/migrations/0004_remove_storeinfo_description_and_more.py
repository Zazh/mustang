# Generated by Django 5.1.3 on 2025-03-18 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pos', '0003_storeinfo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storeinfo',
            name='description',
        ),
        migrations.RemoveField(
            model_name='storeinfo',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='storeinfo',
            name='longitude',
        ),
        migrations.RemoveField(
            model_name='storeinfo',
            name='photo',
        ),
        migrations.AddField(
            model_name='storeinfo',
            name='socialAcc',
            field=models.CharField(blank=True, null=True, verbose_name='Social Acc'),
        ),
        migrations.AddField(
            model_name='storeinfo',
            name='socialLink',
            field=models.CharField(blank=True, null=True, verbose_name='Social Link'),
        ),
        migrations.AddField(
            model_name='storeinfo',
            name='socialName',
            field=models.CharField(blank=True, null=True, verbose_name='Social Name'),
        ),
        migrations.AlterField(
            model_name='storeinfo',
            name='phone',
            field=models.TextField(blank=True, max_length=20, null=True, verbose_name='Phone'),
        ),
    ]
