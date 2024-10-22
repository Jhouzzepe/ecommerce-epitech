import os
import sys
import django

# Ajoutez le chemin du projet à PYTHONPATH
sys.path.append('/home/yuss27/git/W-WEB-502-LIL-2-1-ecommerce-alexis.dezeque/ecommerce/backend')

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.models import Category

categories = [
    {
        'name': 'Amerika',
        'description': 'tshirt faceSwap de personnalités américaines'
    },
    {
        'name': "Ch'nord",
        'description': 'tshirt FaceSwap des Tuches'
    },
    {
        'name': 'Epitech',
        'description': 'vêtements FaceSwap des pédagos d\'Epitech'
    },
    {
        'name': 'W@C',
        'description': 'vêtements FaceSwap des personnes de la W@C'
    },
    {
        'name': 'Législatives 2024',
        'description': 'vêtements FaceSwap des personnes politiques françaises'
    }
]

def add_categories():
    for category_data in categories:
        category, created = Category.objects.get_or_create(name=category_data['name'], defaults={'description': category_data['description']})
        if created:
            print(f'Category "{category.name}" created.')
        else:
            print(f'Category "{category.name}" already exists.')

if __name__ == '__main__':
    add_categories()
