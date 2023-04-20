import axios from 'axios'
import React, { useState } from 'react'

import CardSearch from '../../components/card/cardSearch'
import "./search.css"

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`);
      setMovies(res.data.results);
      console.log(res)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='search'>
      <div className='search_bar'>
        <input className='input' type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Your Favorite Shows...." />
        <button className='button' onClick={handleSearch}>Search</button>
      </div>
      <div className="movie__list">
        <h2 className="list__title">RESULTS</h2>
        <div className="list__cards">
          {
            movies ?
              movies.map(movie => (
                <CardSearch movie={movie} />
              ))
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

export default Search