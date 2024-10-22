from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import base64
import os
from django.core.files.base import ContentFile
from .constants import COUNTRY_CHOICES  # Importer les choix de pays
from django.utils.text import slugify


class Size(models.Model):
    SIZE_CHOICES = [
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', '2XL'),
        ('XXXL', '3XL'),
        ('XXXXL', '4XL'),
    ]
    name = models.CharField(max_length=5, choices=SIZE_CHOICES, unique=True)

    def __str__(self):
        return self.get_name_display()


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    gender = models.CharField(max_length=10, choices=[('Homme', 'Homme'), ('Femme', 'Femme')], blank=True)
    country = models.CharField(max_length=3, choices=COUNTRY_CHOICES, blank=True)  # Utiliser les choix de pays
    capy_coins = models.IntegerField(default=0)  # Nouveau champ pour stocker les CapyCoins

    def __str__(self):
        return self.user.username


class Color(models.Model):
    name = models.CharField(max_length=50)
    hex_code = models.CharField(max_length=7)  # Code hexadécimal (ex: #FFFFFF)

    def __str__(self):
        return self.name


def get_product_image_path(instance, filename):
    # Générer un nom de fichier unique basé sur le nom du produit et son ID
    base_filename, file_extension = os.path.splitext(filename)
    # Slugifier le nom du produit pour le rendre URL-friendly
    slugified_name = slugify(instance.name)
    # Créer un nouveau nom de fichier
    new_filename = f"{slugified_name}_{instance.id}{file_extension}"
    # Définir le chemin de sauvegarde de l'image
    return os.path.join('product_images', new_filename)

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField()
    available = models.BooleanField(default=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    colors = models.ManyToManyField(Color, blank=True)
    sizes = models.ManyToManyField(Size, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to=get_product_image_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Appeler la méthode parent save() pour enregistrer l'objet en premier
        super(Product, self).save(*args, **kwargs)

        # Modifier le chemin de l'image après la première sauvegarde
        if self.image:
            if hasattr(self.image, 'file') and not self.image.file.closed:
                self.image.file.seek(0)
            else:
                with open(self.image.path, 'rb') as image_file:
                    pass

        # Sauvegarder de nouveau après avoir modifié l'image
        super(Product, self).save(*args, **kwargs)


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} on {self.product.name}'


class Discount(models.Model):
    code = models.CharField(max_length=50, unique=True)
    value = models.DecimalField(max_digits=5, decimal_places=2)  # Pourcentage de réduction
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField()
    active = models.BooleanField(default=True)

    def is_valid(self):
        now = timezone.now()
        return self.active and self.start_date <= now <= self.end_date

    def apply_discount(self, amount):
        if self.is_valid():
            return amount * (1 - self.value / 100)
        return amount

class Order(models.Model):
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    final_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20)
    delivery_address = models.CharField(max_length=255, default='Default Address')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    discount = models.ForeignKey(Discount, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.discount and self.discount.is_valid():
            self.final_amount = self.discount.apply_discount(self.total_amount)
        else:
            self.final_amount = self.total_amount
        super().save(*args, **kwargs)








class OrderLine(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} of {self.product.name}"


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in cart"

class ShippingInfo(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address1 = models.CharField(max_length=255, null=True, blank=True)
    address2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    card_number = models.CharField(max_length=16, null=True, blank=True)
    expiry_date = models.CharField(max_length=5, null=True, blank=True)
    cvv = models.CharField(max_length=3, null=True, blank=True)
    shipping_method = models.CharField(max_length=100, null=True, blank=True)
    tracking_number = models.CharField(max_length=100, unique=True, null=True, blank=True)
    shipping_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    estimated_delivery = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipping info for order {self.order.id}"

class Prestataire(models.Model):
    nom = models.CharField(max_length=100)
    ean = models.CharField(max_length=13)
    poids_max_colis = models.DecimalField(max_digits=10, decimal_places=2)
    dimensions = models.CharField(max_length=50)  # Format "HxLxP"
    cout_par_mille = models.DecimalField(max_digits=10, decimal_places=2)
    montant_facture_client = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nom


class DeliveryMethod(models.Model):
    label = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    delivery_time = models.CharField(max_length=20)

    def __str__(self):
        return self.label

from django.db import models

class FacturationData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address1 = models.CharField(max_length=255, null=True, blank=True)
    address2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    card_number = models.CharField(max_length=16, null=True, blank=True)
    expiry_date = models.CharField(max_length=5, null=True, blank=True)
    cvv = models.CharField(max_length=3, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"
