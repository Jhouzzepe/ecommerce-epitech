import React, { useEffect, useState } from "react";
import { useToken } from "../../contexts/UserTokenContext";
import OrderDetails from "./OrderDetails"; // Assurez-vous que ce chemin est correct

function Orders() {
  const { accessToken } = useToken();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Pour stocker la commande sélectionnée

  useEffect(() => {
    fetch("http://localhost:8000/api/orders/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de requête");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [accessToken]);

  const handleViewDetails = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="p-4">
      {selectedOrder ? (
        <OrderDetails orderId={selectedOrder} onBack={handleBack} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Commande du {new Date(order.created_at).toLocaleDateString()}
                    </h2>
                    <p className="text-gray-600">Total: {order.total_amount} €</p>
                    <p className="text-gray-600">État: {order.status}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleViewDetails(order.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Voir les détails
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Orders;
