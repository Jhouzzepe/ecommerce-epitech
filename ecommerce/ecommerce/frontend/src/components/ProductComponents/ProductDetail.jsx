import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import ReviewForm from '../ReviewForm';
import api from '../../services/api';
import authService from '../../services/authService';
import { useToken } from "../../contexts/UserTokenContext";
import MoreProduct from "./MoreProduct";
import QuantitySelector from "./QuantitySelector";
import SizeFilter from "./SizeFilter";
import ColorSelector from "./ColorSelector";
import axios from "axios";

const colorMap = {
  "#304434": "Vert Foncé",
  "#000000": "Noir",
  "#FFFFFF": "Blanc",
};

const ProductDetail = () => {
  const { accessToken } = useToken();
  const { productId } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === parseInt(productId));
  const [reviews, setReviews] = useState([]);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (product) {
      api.get(`/reviews/?product=${product.id}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the reviews!', error);
        });
    }
  }, [product]);

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  const handleReviewUpdated = (updatedReview) => {
    setReviews(reviews.map(review => (review.id === updatedReview.id ? updatedReview : review)));
    setReviewToEdit(null);
  };

  const handleEditClick = (review) => {
    setReviewToEdit(review);
  };

  const handleCancelEdit = () => {
    setReviewToEdit(null);
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}/`);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('There was an error deleting the review!', error);
    }
  };

  const [showSizeFilter, setShowSizeFilter] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setShowSizeFilter(false);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleAddToCart = () => {
    if (!accessToken) {
      console.error("Aucun token d'accès fourni");
      return;
    }

    const colorName = colorMap[selectedColor] || selectedColor;
    console.log(
      `Référence (ID) : ${product.id}, Taille: ${selectedSize}, Couleur: ${colorName}, Quantité: ${quantity}`
    );

    axios
      .post(
        "http://localhost:8000/api/cart/add/",
        {
          product_id: product.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Produit ajouté au panier:", response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'ajout au panier:",
          error.response ? error.response.data : error.message
        );
      });
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">Produit non trouvé</p>
      </div>
    );
  }

  return (
    <main className="my-8 mb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center">
          {/* Image Produit */}
          <div className="w-full h-80 md:w-1/2 lg:h-96 mr-0 md:mr-8">
            <img
              className="h-full w-full rounded-md object-cover transform scale-80"
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
            />
          </div>

          <div
            className="flex flex-col md:flex-row border mt-6 md:mt-0 ml-0 md:ml-8 w-full"
            style={{ paddingRight: "3%" }}
          >
            {/* Infos produits */}
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0">
                <div className="pt-8">
                  <h3 className="text-gray-700 uppercase text-xl">
                    {product.name}
                  </h3>
                  <span className="text-gray-500">{product.price}€</span>
                </div>
                <hr className="my-3" />

                {/* Quantité à commander */}
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                {/* Couleur du produit */}
                <ColorSelector
                  selectedColor={selectedColor}
                  onColorClick={handleColorClick}
                />

                {/* Taille du produit (Filtre) */}
                <SizeFilter
                  selectedSize={selectedSize}
                  onSizeClick={handleSizeClick}
                />

                {/* Bouton acheter */}
                <div className="flex items-center mt-6 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="px-8 py-2 bg-[#2E4033] text-white text-sm font-medium rounded hover:bg-[#47925D] focus:outline-none focus:bg-green-500"
                  >
                    Ajouter au panier ({product.price}€)
                  </button>
                </div>
              </div>
            </div>

            {/* Description du produit */}
            <div className="w-full md:w-1/2 mt-6 md:mt-4 md:ml-24 md:pr-8 md:pb-4">
              <h3 className="text-gray-700 uppercase text-xl mt-6 mb-6 mr-12">
                Description
              </h3>
              <span className="text-gray-500">{product.description}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ReviewForm
            productId={product.id}
            onSubmit={reviewToEdit ? handleReviewUpdated : handleReviewAdded}
            initialRating={reviewToEdit ? reviewToEdit.rating : 0}
            initialComment={reviewToEdit ? reviewToEdit.comment : ''}
            reviewToEdit={reviewToEdit}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="bg-white p-4 rounded shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-4">Commentaires</h2>
          {reviews.map(review => (
            <div key={review.id} className="mb-4 border-b pb-4">
              <p className="text-gray-700"><strong>{review.username}</strong> ({new Date(review.created_at).toLocaleDateString()}):</p>
              <p className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              <p>{review.comment}</p>
              <div className="flex space-x-2 mt-2">
                {currentUser?.id === review.user.id && (
                  <>
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
                      onClick={() => handleEditClick(review)}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                      onClick={() => handleDeleteClick(review.id)}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <MoreProduct />
      </div>
    </main>
  );
};

export default ProductDetail;
