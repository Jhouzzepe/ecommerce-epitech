from django import forms
from django.contrib import admin
from .models import Product, Category, Review, Order, OrderLine, Cart, CartItem, ShippingInfo, UserProfile, Color, Size, Prestataire, ShippingInfo, DeliveryMethod, Discount, FacturationData
from .constants import COUNTRY_CHOICES


class ProductAdminForm(forms.ModelForm):
    sizes = forms.ModelMultipleChoiceField(queryset=Size.objects.all(), widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Product
        fields = '__all__'


class UserProfileForm(forms.ModelForm):
    country = forms.ChoiceField(choices=COUNTRY_CHOICES, widget=forms.Select)

    class Meta:
        model = UserProfile
        fields = '__all__'


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    form = UserProfileForm
    list_display = ('user', 'phone_number', 'address', 'postal_code', 'gender', 'country')
    search_fields = ('user__username', 'phone_number', 'address', 'postal_code', 'country')


class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code')


# Enregistrer le modèle Color avec la configuration d'administration

admin.site.register(Color, ColorAdmin)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ('name', 'price', 'stock', 'available', 'weight')
    list_filter = ('available', 'category')
    search_fields = ('name', 'category__name')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'created_at')
    search_fields = ('product__name', 'user__username')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'total_amount', 'status', 'created_at')
    search_fields = ('customer__username',)


@admin.register(OrderLine)
class OrderLineAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order__customer__username', 'product__name')


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'updated_at')
    search_fields = ('user__username',)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'created_at', 'updated_at')
    search_fields = ('cart__user__username', 'product__name')

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Prestataire)
class PrestataireAdmin(admin.ModelAdmin):
    list_display = ('nom', 'ean', 'poids_max_colis', 'dimensions', 'cout_par_mille', 'montant_facture_client')
    search_fields = ('nom', 'ean')

@admin.register(ShippingInfo)
class ShippingInfoAdmin(admin.ModelAdmin):
    list_display = ('order', 'first_name', 'last_name', 'email', 'phone', 'address1', 'address2', 'city', 'postal_code', 'country', 'tracking_number', 'shipping_cost', 'estimated_delivery', 'created_at', 'updated_at')
    search_fields = ('first_name', 'last_name', 'email', 'tracking_number')
    list_filter = ('country', 'shipping_method', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(DeliveryMethod)
class DeliveryMethodAdmin(admin.ModelAdmin):
    list_display = ('label', 'price', 'delivery_time')
    search_fields = ('label',)
    list_filter = ('delivery_time',)


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('code', 'value', 'start_date', 'end_date', 'active')
    search_fields = ('code',)
    list_filter = ('active', 'start_date', 'end_date')
    ordering = ('-start_date',)

@admin.register(FacturationData)
class FacturationMethodAdmin(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name', 'email', 'card_number')
    list_filter = ('country', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

