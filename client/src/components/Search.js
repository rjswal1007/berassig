import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './search.css'
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breweries, setBreweries] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://api.openbrewerydb.org/breweries?by_city=${searchTerm}`);
      setBreweries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='cont'>
     <a href="/Login" className='logout'>Logout</a>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by city" />
      <button onClick={handleSearch} className='ss'>Search</button>
      <ul>
        {breweries.map(brewery => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>
              {brewery.name} - {brewery.city}, {brewery.state}
            </Link>
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default Search;
