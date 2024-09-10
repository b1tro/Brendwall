
from django.shortcuts import render

#Импорты для API
from rest_framework import generics
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response

from .forms import ProductForm
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreate(APIView):
    def get(self, request):
        form = ProductForm()
        return render(request, 'products/create.html',
                      {"form": form})
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status="201")
        # Если проверка валидации не была пройдена, не был вызван прошлый return,
        # а значит, следует вернуть ошибку запроса
        return Response(serializer.errors, status="400")

