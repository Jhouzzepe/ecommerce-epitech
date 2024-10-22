from ecommerce.backend.products.utils import calculate_shipping_cost
from ecommerce.backend.products.models import Order

SHIPPING_PROVIDERS = [
    {"name": "PrestaColis (S)", "max_weight": 4, "client_cost": 2.99},
    {"name": "PrestaColis (M)", "max_weight": 10, "client_cost": 3.99},
    {"name": "PrestaColis (L)", "max_weight": 25, "client_cost": 5.99},
    {"name": "MaigaLour", "max_weight": 70, "client_cost": 10.99},
    {"name": "MaigaLour Premium", "max_weight": 300, "client_cost": 21.99}
]

def calculate_shipping_cost(order):
    total_weight = sum(item.product.weight * item.quantity for item in order.orderline_set.all())

    for provider in SHIPPING_PROVIDERS:
        if total_weight <= provider["max_weight"]:
            return provider["client_cost"]

    return None

order = Order.objects.get(id=1)

shipping_cost = calculate_shipping_cost(order)

print(f"Les frais de port pour la commande {order.id} sont de {shipping_cost} €")