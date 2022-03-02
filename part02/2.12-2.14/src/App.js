import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Countries = (props) => {
  const list = (
    props.list
      .filter(country => country.name.common.includes(props.filter))
  )

  if (list.length === 1) {
    return (
      <div>
        {
          list
            .map(country => (
              <Country 
                name={country.name.common}
                capital={country.capital}
                area={country.area}
                languages={country.languages}
                cca2={country.cca2}
                flag={country.flags.svg}
              />
            ))
        }
      </div>
    )
  } else if (list.length <= 10 && list.length > 0) {
    return (
      list.map(country => <div key={country.cca2}>{country.name.common}</div>)
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter!
      </div>
    )
  }
}

const Country = (props) => {
  const languages = [];
  for (const [abbreviation, language] of Object.entries(props.languages)) {
    languages.push(language);
  }

  return (
    <div key={props.cca2}>
      <h1 key="name">{props.name}</h1>
      <p key="capital">capital {props.capital}</p>
      <p key="area">area {props.area}</p>
      <h2 key="languages">languages</h2>
      <ul key="language-list">
        {
          languages.map(language => (<li key={language.slice(0,4)}>{language}</li>))
        }
      </ul>
      <img src={props.flag} key="flag" height="200" />
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  })
  
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

