import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    });
  },[]);
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <input value={filter} onChange={handleFilterChange} />
      <Countries list={countries} filter={filter} />
    </div>
  );
}

export default App;

