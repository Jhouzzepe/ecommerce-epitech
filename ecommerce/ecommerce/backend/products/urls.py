from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, CategoryViewSet, RegisterView, UserProfileView, UserProfileListView,
    UserProfileDetailView, CartView, UserCartView, AddToCartView, RemoveFromCartView,
    ReviewViewSet, ShippingInfoCreateView, ShippingInfoRetrieveView, ShippingInfoUpdateView,
    ShippingInfoDestroyView, UserOrderListView, UserProfileUpdateView, DeliveryMethodListCreate,
    DeliveryMethodDetail, FacturationDataListCreateView, FacturationDataDetailView,
    OrderCreateView, OrderDestroyView, OrderDetailView, ValidateOrderView, CartItemListView,
    UpdateCartItemView, CategoryProductViewSet, CustomTokenObtainPairView, PrestataireCreate,
    PrestataireGet, PrestataireDestroy, PrestataireGetAll, ApplyDiscountCodeView, OrderLineListView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'category-products', CategoryProductViewSet, basename='category-product')
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/profile/update/', UserProfileUpdateView.as_view(), name='profile-update'),
    path('api/users/', UserProfileListView.as_view(), name='user-list'),
    path('api/users/<int:user_id>/', UserProfileDetailView.as_view(), name='user-detail'),
    path('api/cart/', CartView.as_view(), name='cart'),
    path('api/cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('api/cart/remove/<int:product_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('api/cart/<int:user_id>/', UserCartView.as_view(), name='user_cart'),
    path('api/cart/<int:user_id>/items/', CartItemListView.as_view(), name='cart_item_list'),
    path('api/cart/update/<int:product_id>/', UpdateCartItemView.as_view(), name='update_cart_item'),
    path('api/prestataire/create/', PrestataireCreate.as_view(), name='prestataire_create'),
    path('api/prestataires/', PrestataireGetAll.as_view(), name='prestataire_get_all'),
    path('api/prestataire/<int:pk>/', PrestataireGet.as_view(), name='prestataire_get'),
    path('api/prestataire/destroy/<int:pk>/', PrestataireDestroy.as_view(), name='prestataire_destroy'),
    path('api/shipping/add/', ShippingInfoCreateView.as_view(), name='shipping-info-create'),
    path('api/shipping/<int:pk>/', ShippingInfoRetrieveView.as_view(), name='shipping-info-retrieve'),
    path('api/shipping/<int:pk>/update/', ShippingInfoUpdateView.as_view(), name='shipping-info-update'),
    path('api/shipping/<int:pk>/delete/', ShippingInfoDestroyView.as_view(), name='shipping-info-delete'),
    path('api/deliverymethods/', DeliveryMethodListCreate.as_view(), name='delivery-method-list-create'),
    path('api/deliverymethods/<int:pk>/', DeliveryMethodDetail.as_view(), name='delivery-method-detail'),
    path('api/orders/create/', OrderCreateView.as_view(), name='order-create'),
    path('api/orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('api/orders/<int:pk>/delete/', OrderDestroyView.as_view(), name='order-delete'),
    path('api/orders/validate/', ValidateOrderView.as_view(), name='validate-order'),
    path('api/orders/', UserOrderListView.as_view(), name='user-orders'),
    path('api/facturations/', FacturationDataListCreateView.as_view(), name='facturation-list-create'),
    path('api/facturations/<int:pk>/', FacturationDataDetailView.as_view(), name='facturation-detail'),
    path('api/discounts/apply/', ApplyDiscountCodeView.as_view(), name='apply_discount'),
    path('api/orderline/<int:order_id>/', OrderLineListView.as_view(), name='order-line-list'),
]
