from django.contrib import admin
from .models import Kategori, Produk, Cart, CartItem, Order, OrderItem 

# Register your models here.
admin.site.register(Kategori)
admin.site.register(Produk)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)