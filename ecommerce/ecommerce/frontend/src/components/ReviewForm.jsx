import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ReviewForm = ({ productId, onSubmit, initialRating = 0, initialComment = '', reviewToEdit, onCancelEdit }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [error, setError] = useState('');

  useEffect(() => {
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  }, [reviewToEdit]);

  const handleStarClick = (newRating) => {
    setRating(newRating);
    setError(''); // Clear error when user interacts with the form
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Check if a rating is given without a comment
    if (rating > 0 && comment.trim() === '') {
      setError('Vous devez ajouter un commentaire pour accompagner votre note.');
      return;
    }

    try {
      let response;
      if (reviewToEdit) {
        response = await api.put(`/reviews/${reviewToEdit.id}/`, { rating, comment, product: productId });
      } else {
        response = await api.post(`/reviews/`, { rating, comment, product: productId });
      }
      onSubmit(response.data);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('There was an error submitting the review!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{reviewToEdit ? 'Modifier le commentaire' : 'Ajouter un commentaire'}</h2>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Évaluation :</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              className={star <= rating ? 'text-yellow-500 cursor-pointer' : 'text-gray-300 cursor-pointer'}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">Commentaire :</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
        />
      </div>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex items-center space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          {reviewToEdit ? 'Mettre à jour' : 'Soumettre'}
        </button>
        {reviewToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
