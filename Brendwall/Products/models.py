from django.db import models

# Валидация
from django.core.exceptions import ValidationError

class Product(models.Model):
    name = models.CharField(max_length=127, blank=False)
    description = models.TextField(blank=True)
    price = models.FloatField()

    def __str__(self):
        return self.name

    # Валидация полей
    # Переопределим метод clean
    def clean(self):
        # Сначала вызываем исходный метод, чтобы убедиться что встроенная валидация Django сработала
        super().clean()
        # После, проверяя значения полей на необходимые условия, поднимаем ошибки валидации
        if not self.name:
            raise ValidationError("Отсутствует название продукта!")
        if self.price <= 0:
            raise ValidationError("Цена не может быть меньше или равна 0!")