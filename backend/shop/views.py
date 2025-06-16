# backend/shop/views.py

from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import Order
from .serializers import OrderSerializer

from .models import Kategori, Produk, Cart, CartItem, Order, OrderItem
from .serializers import (
    KategoriSerializer,
    ProdukSerializer,
    UserRegisterSerializer,
    CartSerializer,
    CartItemSerializer,
    OrderSerializer,
)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CartSerializer

    def list(self, request):
        cart = Cart.objects.filter(user=request.user, checked_out=False).first()
        if not cart:
            cart = Cart.objects.create(user=request.user, checked_out=False)
        serializer = self.serializer_class(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add(self, request):
        cart = Cart.objects.filter(user=request.user, checked_out=False).first()
        if not cart:
            cart = Cart.objects.create(user=request.user, checked_out=False)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        product = get_object_or_404(Produk, id=product_id)
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        item.quantity += quantity
        item.save()
        return Response({'status': 'item added'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        cart = get_object_or_404(Cart, user=request.user, checked_out=False)
        product_id = request.data.get('product_id')
        item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
        item.delete()
        return Response({'status': 'item removed'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def update_item(self, request):  
        cart = get_object_or_404(Cart, user=request.user, checked_out=False)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
        item.quantity = quantity
        item.save()
        return Response({'status': 'item updated'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        cart = get_object_or_404(Cart, user=request.user, checked_out=False)
        phone = request.data.get('phone')
        address = request.data.get('address')
        order = Order.objects.create(
            user=request.user, phone=phone, address=address, status='pending'
        )
        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.harga
            )
            # Kurangi stok produk
            item.product.stok -= item.quantity
            item.product.save()
        cart.checked_out = True
        cart.save()
        cart.items.all().delete()
        return Response({'status': 'checkout successful'}, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at') 
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_order_detail(request, pk):
    try:
        order = Order.objects.get(pk=pk, user=request.user)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data)

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True  
        return request.user and request.user.is_authenticated and request.user.is_staff

class VerifyEmailView(APIView):
    def get(self, request):
        uidb64 = request.GET.get('uid')
        token = request.GET.get('token')
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Email berhasil diverifikasi.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Link tidak valid atau sudah kadaluarsa.'}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [] 

    def perform_create(self, serializer):
        user = serializer.save()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        verification_link = f"http://localhost:8000/api/verify-email/?uid={uid}&token={token}"
        send_mail(
            'Verifikasi Email Anda',
            f'Klik link berikut untuk verifikasi akun: {verification_link}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
    permission_classes = [IsAdminOrReadOnly]

class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    # Jika Anda menambahkan metode get_gambar di serializer, tambahkan context:
    # def get_serializer_context(self):
    #     return {'request': self.request}
