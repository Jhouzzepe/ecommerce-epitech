// ecommerce/frontend/src/components/AddReview.js

import React, { useState } from 'react';
import axios from 'axios';

const AddReview = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/reviews/', {
        product: productId,
        rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Review submitted:', response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={submitReview}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>{star}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReview;
