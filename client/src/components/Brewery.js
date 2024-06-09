import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './brewery.css'

const Brewery = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const res = await axios.get(`https://api.openbrewerydb.org/breweries/${id}`);
        setBrewery(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrewery();
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/reviews', { breweryId: id, userId: token, rating, description });
      setReviews([...reviews, res.data]);
      setRating(1);
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
      <p>Phone: {brewery.phone}</p>
      <p><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a></p>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <strong>{review.rating}/5</strong> - {review.description} by {review.userId.username}
          </li>
        ))}
      </ul>
      <h3 className='add'>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Brewery;
