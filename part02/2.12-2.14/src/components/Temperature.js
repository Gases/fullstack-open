import axios from 'axios';
import { useEffect, useState } from 'react';

const Temperature = (props) => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [temp, setTemp] = useState();
  const [wind, setWind] = useState();
  const [icon, setIcon] = useState('');

  useEffect(() => {    
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${props.capital},${props.cca2}&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`)
      .then(location => {
        setLat(location.data[0].lat);
        setLong(location.data[0].lon);
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`)
      .then(weather => {
        setTemp(weather.data.main.temp - 273.15);
        setWind(weather.data.wind.speed);
        setIcon(weather.data.weather[0].icon);
      })
  },[lat, long])

  if (temp && wind) {
    return (
      <div>
        <p>temperature {temp.toFixed(1)}°C</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        <p>wind {wind.toFixed(1)} m/s</p>
      </div>
    )
  } else {
    return (
      <div>
        Weather is loading
      </div>
    )
  }
}

export default Temperature;