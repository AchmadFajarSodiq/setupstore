# backend/shop/serializers.py

from rest_framework import serializers
from .models import Kategori, Produk, Cart, CartItem, Order, OrderItem
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            is_active=False  # User belum aktif
        )
        return user

class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = '__all__' 

class ProdukSerializer(serializers.ModelSerializer):
    kategori_nama = serializers.ReadOnlyField(source='kategori.nama')

    class Meta:
        model = Produk
        fields = '__all__' 

class CartItemSerializer(serializers.ModelSerializer):
    product = ProdukSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Produk.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'checked_out', 'items']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProdukSerializer(read_only=True)  

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.CharField(source='user.username', read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'phone', 'address', 'status', 'items', 'total_price']

    def get_total_price(self, obj):
        return sum(item.price * item.quantity for item in obj.items.all())