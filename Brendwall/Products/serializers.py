from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']

    # В классе модели ранее была прописана валидация полей,что обеспечивает,
    # что не зависимо от источника появления нового экземпляра модели
    # однако,чтобы предотвращать ошибки на уровни API, в сериализаторе
    # также пропишу свою валидацию
    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Отсутствует название!")
        return value

    def validate_price(self, value):
        if float(value) <= 0:
            raise serializers.ValidationError("Цена должна быть положительной!")
        return float(value)
