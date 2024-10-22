import React, { useEffect, useState } from "react";
import { useToken } from "../../contexts/UserTokenContext";
import { useNavigate, Link } from "react-router-dom";

function OrderDetails({ orderId }) {
  const { accessToken } = useToken();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${productId}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Erreur de requête produit');
        }
        return response.json();
      } catch (err) {
        console.error("Erreur lors de la récupération des détails du produit:", err);
        return null;
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orderline/${orderId}/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Erreur de requête commande');
        }
        const data = await response.json();
        
        const productPromises = data.map(async (line) => {
          const product = await fetchProductDetails(line.product);
          return { ...line, productName: product ? product.name : 'Produit non trouvé' };
        });
        const enrichedOrderDetails = await Promise.all(productPromises);
        
        // Calcul du montant total
        const total = enrichedOrderDetails.reduce((sum, line) => sum + (parseFloat(line.price) * line.quantity), 0);
        setTotalAmount(total);
        
        setOrderDetails(enrichedOrderDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [accessToken, orderId]);

  if (loading) {
    return <div className="text-center text-gray-500">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Détails de la Commande {orderId}</h1>
      {orderDetails && orderDetails.length > 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="space-y-4">
            {orderDetails.map((line) => (
              <li key={line.id} className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      to={`/product/${line.product}`}
                      className="text-xl font-semibold text-blue-600 hover:underline"
                    >
                      Produit: {line.productName}
                    </Link>
                    <p className="text-gray-600">Quantité: {line.quantity}</p>
                    <p className="text-gray-600">Prix unitaire: {line.price} €</p>
                    <p className="text-gray-600">Total pour ce produit: {(parseFloat(line.price) * line.quantity).toFixed(2)} €</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-gray-300 pt-4">
            <h2 className="text-2xl font-bold">Montant Total: {totalAmount.toFixed(2)} €</h2>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucune ligne de commande trouvée.</p>
      )}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/orders')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Retourner à la liste des commandes
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
