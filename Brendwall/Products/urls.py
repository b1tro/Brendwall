from django.urls import path

from .views import ProductList, ProductCreate

urlpatterns = [
    path('', ProductList.as_view(), name='product_list'),
    path('create', ProductCreate.as_view(), name='product_create'),
]
