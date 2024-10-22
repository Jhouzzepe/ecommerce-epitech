# products/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, generics
from .models import Product, Category, Cart, CartItem, Review, UserProfile, Prestataire, ShippingInfo, DeliveryMethod, Order, Discount, FacturationData, OrderLine
from .serializers import ProductSerializer, CategorySerializer, RegisterSerializer, UserSerializer, ReviewSerializer, CartSerializer, CartItemSerializer, UserProfileDetailSerializer, PrestataireSerializer, ShippingInfoSerializer, DeliveryMethodSerializer, OrderSerializer, OrderLineSerializer, FacturationDataSerializer

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView as BaseTokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Product, Category, Review
from .serializers import ProductSerializer, CategorySerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
import datetime


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticatedOrReadOnly])
    def add_review(self, request, pk=None):
        product = self.get_object()
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        product_id = request.data.get('product')
        product = Product.objects.get(id=product_id)
        review = Review.objects.create(
            product=product,
            user=request.user,
            rating=request.data['rating'],
            comment=request.data['comment']
        )
        serializer = self.get_serializer(review)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if instance.user != request.user:
            raise PermissionDenied("You do not have permission to edit this review.")

        data = request.data
        data['product'] = instance.product_id
        data['user'] = instance.user_id

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user != request.user:
            raise PermissionDenied("You do not have permission to delete this review.")

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        if product_id:
            return self.queryset.filter(product_id=product_id)
        return self.queryset


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

import logging

logger = logging.getLogger(__name__)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def update(self, request, *args, **kwargs):
        logger.info(f'Request data: {request.data}')
        return super().update(request, *args, **kwargs)

class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileDetailSerializer

class UserProfileDetailView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileDetailSerializer
    lookup_field = 'user__id'


class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def perform_update(self, serializer):
        serializer.save()

    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CartView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_object(self):
        user = self.request.user
        cart, created = Cart.objects.get_or_create(user=user)
        return cart

class UserCartView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_object(self):
        user_id = self.kwargs['user_id']
        return Cart.objects.get(user_id=user_id)


class AddToCartView(generics.CreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(user=user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if not created:
            cart_item.quantity += int(quantity)
        else:
            cart_item.quantity = int(quantity)

        cart_item.save()
        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

class RemoveFromCartView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer
    lookup_field = 'product_id'

    def get_queryset(self):
        user = self.request.user
        cart, created = Cart.objects.get_or_create(user=user)
        return CartItem.objects.filter(cart=cart, product_id=self.kwargs['product_id'])

    def delete(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        queryset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomTokenObtainPairView(BaseTokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if 'remember_me' in request.data and request.data['remember_me']:
            response.set_cookie(
                api_settings.AUTH_COOKIE,
                response.data['refresh'],
                max_age=api_settings.AUTH_TOKEN_LIFETIME,
                httponly=True,
                samesite='Lax',
            )
        return response

class CategoryProductViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['get'])
    def products(self, request, pk=None):
        category = Category.objects.get(pk=pk)
        products = Product.objects.filter(category=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
class CartItemListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartItemSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        try:
            cart = Cart.objects.get(user_id=user_id)
            return CartItem.objects.filter(cart=cart)
        except Cart.DoesNotExist:
            return CartItem.objects.none()
        
class UpdateCartItemView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, product_id, format=None):

        user_id = request.user.id
        try:
            cart = Cart.objects.get(user_id=user_id)
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
        except Cart.DoesNotExist:
            return Response({'detail': 'Cart does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except CartItem.DoesNotExist:
            return Response({'detail': 'Cart item does not exist'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CartItemSerializer(cart_item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrestataireCreate(generics.CreateAPIView):
        queryset = Prestataire.objects.all()
        serializer_class = PrestataireSerializer

class PrestataireGetAll(generics.ListAPIView):
    def get(self, request, *args, **kwargs):

        prestataires = Prestataire.objects.all()
        serializer = PrestataireSerializer(prestataires, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PrestataireGet(generics.RetrieveAPIView):
    def get(self, request, pk, *args, **kwargs):
        try:
            prestataire = Prestataire.objects.get(pk=pk)
        except Prestataire.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PrestataireSerializer(prestataire)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PrestataireDestroy(generics.DestroyAPIView):
    def delete(self, request, pk, *args, **kwargs):
        try:
            prestataire = Prestataire.objects.get(pk=pk)
        except Prestataire.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        prestataire.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ShippingInfo views
class ShippingInfoCreateView(generics.CreateAPIView):
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShippingInfoRetrieveView(generics.RetrieveAPIView):
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class ShippingInfoUpdateView(generics.UpdateAPIView):
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ShippingInfoDestroyView(generics.DestroyAPIView):
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer
    permission_classes = [IsAuthenticated] 


class DeliveryMethodListCreate(generics.ListCreateAPIView):
    queryset = DeliveryMethod.objects.all()
    serializer_class = DeliveryMethodSerializer

class DeliveryMethodDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeliveryMethod.objects.all()
    serializer_class = DeliveryMethodSerializer
    permission_classes = [IsAuthenticated]

class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user)

class ApplyDiscountCodeView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        try:
            code = request.query_params.get('code', None)

            if not code:
                return Response({'success': False, 'message': 'Aucun code de réduction fourni.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                discount = Discount.objects.get(code=code, active=True)
                if discount.start_date <= timezone.now() <= discount.end_date:
                    return Response({'success': True, 'discount_value': discount.value}, status=status.HTTP_200_OK)
                else:
                    return Response({'success': False, 'message': 'Code de réduction expiré.'}, status=status.HTTP_400_BAD_REQUEST)
            except Discount.DoesNotExist:
                return Response({'success': False, 'message': 'Code de réduction invalide.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Capture toute autre exception qui pourrait survenir
            return Response({'success': False, 'message': 'Erreur interne du serveur', 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateCapyCoinsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_profile = request.user.profile
        coins_to_add = request.data.get('coins', 0)

        user_profile.capy_coins += coins_to_add

        if user_profile.capy_coins >= 1000:
            # Créer un code de réduction
            discount_code = f"DISCOUNT-{request.user.username.upper()}-{int(datetime.datetime.now().timestamp())}"
            discount = Discount.objects.create(
                code=discount_code,
                value=10.0,  # 10% de réduction
                start_date=datetime.datetime.now(),
                end_date=datetime.datetime.now() + datetime.timedelta(days=1),  # Valide pendant 1 jour
                active=True
            )

            user_profile.capy_coins = 0  # Réinitialise les CapyCoins après la création du code de réduction
            user_profile.save()

            return Response({
                'message': 'Félicitations! Vous avez obtenu un coupon de réduction de 10%.',
                'discount_code': discount.code
            }, status=status.HTTP_200_OK)
        else:
            user_profile.save()
            return Response({'message': 'CapyCoins mis à jour avec succès.'}, status=status.HTTP_200_OK)
          
class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)


class OrderDestroyView(generics.DestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(customer=self.request.user)

class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(customer=self.request.user)


class ValidateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data

        # Récupérer et valider le code de réduction
        discount_code = data.get('discount_code')
        discount = None
        if discount_code:
            try:
                discount = Discount.objects.get(code=discount_code, active=True)
            except Discount.DoesNotExist:
                return Response({"detail": "Code de réduction invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

        # Calculer le montant total sans réduction
        total_amount = sum(item['price'] * item['quantity'] for item in data['items'])
        delivery_fee = data.get('delivery_fee', 0)
        total_amount += delivery_fee

        # Créer la commande avec le montant total et appliquer la réduction
        order = Order.objects.create(
            customer=user,
            total_amount=total_amount,
            discount=discount,
            status='pending'
        )

        # Créer les lignes de commande
        for item in data['items']:
            OrderLine.objects.create(
                order=order,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )

        # Le montant final est automatiquement calculé et sauvegardé dans `final_amount`
        order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


      
class FacturationDataListCreateView(generics.ListCreateAPIView):
    queryset = FacturationData.objects.all()
    serializer_class = FacturationDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FacturationDataDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FacturationData.objects.all()
    serializer_class = FacturationDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class OrderLineListView(generics.ListAPIView):
    serializer_class = OrderLineSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        order_id = self.kwargs['order_id']
        return OrderLine.objects.filter(order_id=order_id)

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'detail': 'Non autorisé'}, status=status.HTTP_403_FORBIDDEN)
        return super().get(request, *args, **kwargs)
