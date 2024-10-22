import os
import sys
import django

# Ajoutez le chemin du projet à PYTHONPATH
sys.path.append('/home/yuss27/git/W-WEB-502-LIL-2-1-ecommerce-alexis.dezeque/ecommerce/backend')

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Category, Product

sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

# Définir les catégories pour chaque produit
products = [
    {
        'name': 'Polo Homme',
        'description': 'Polo Homme de différentes tailles',
        'category_name': 'Amerika',
        'price': 29.99,
        'image': 'http://example.com/polo_homme.jpg',
        'sizes': sizes
    },
    {
        'name': 'Polo Femme',
        'description': 'Polo Femme de différentes tailles',
        'category_name': 'Amerika',
        'price': 29.99,
        'image': 'http://example.com/polo_femme.jpg',
        'sizes': sizes
    },
    {
        'name': 'T-shirt Homme',
        'description': 'T-shirt Homme de différentes tailles',
        'category_name': 'Amerika',
        'price': 19.99,
        'image': 'http://example.com/tshirt_homme.jpg',
        'sizes': sizes
    },
    {
        'name': 'T-shirt Femme',
        'description': 'T-shirt Femme de différentes tailles',
        'category_name': 'Amerika',
        'price': 19.99,
        'image': 'http://example.com/tshirt_femme.jpg',
        'sizes': sizes
    }
]

def add_products():
    for product_data in products:
        try:
            category = Category.objects.get(name=product_data['category_name'])
        except Category.DoesNotExist:
            print(f'Category "{product_data["category_name"]}" does not exist.')
            continue

        product, created = Product.objects.get_or_create(
            name=product_data['name'],
            defaults={
                'description': product_data['description'],
                'price': product_data['price'],
                'stock': 100,  # Stock par défaut, à ajuster selon les besoins
                'available': True,
                'category': category,
                'image': product_data['image'],
                'sizes': product_data['sizes']
            }
        )

        if created:
            print(f'Product "{product_data["name"]}" created.')
        else:
            print(f'Product "{product_data["name"]}" already exists.')

if __name__ == '__main__':
    add_products()
