"""
URL configuration for setupstore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/setupstore/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from shop import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

router = routers.DefaultRouter()
router.register(r'kategori', views.KategoriViewSet)
router.register(r'produk', views.ProdukViewSet)
router.register(r'cart', views.CartViewSet, basename='cart')

def root(request):
    return JsonResponse({"message": "Welcome to Setup Store API!"})

urlpatterns = [
    path('', root),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/verify-email/', views.VerifyEmailView.as_view(), name='verify-email'),
    path('api/profile/', views.profile_view),
    path('api/orders/', views.user_orders, name='user-orders'),
    path('api/orders/<int:pk>/', views.user_order_detail, name='user-order-detail'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)