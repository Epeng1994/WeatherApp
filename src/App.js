import axios from 'axios';
import React, {useState} from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastWeather from './components/ForecastWeather/ForecastWeather';
import Search from './components/Search/search';

function App() {
  const apiID = process.env.REACT_APP_weatherAPI || '99252094471af63f3bc4db3139381388'
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setCurrentForecast] = useState([])
  const [error,setError] = useState('')

  const handleOnSearchChange = async searchData =>{
    const [latitude,longitude]  = searchData.value.split(' ')

    await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${apiID}`)
      .then(res=>{
        setCurrentWeather(res.data)
      })
      .catch(err=>{
        console.log(err)
      })

    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiID}&units=metric`)
    .then(res=>{
      let weatherResult = res.data.list
      setCurrentForecast([weatherResult[0],weatherResult[8],weatherResult[16],weatherResult[24],weatherResult[32]])
    })
    .catch(err=>{
      console.log(err)
    })
      
  };

  const calculateTempToFarenheit = temp =>{
    return Math.round((temp - 273.15)* 9/5 + 32)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
        <h1>What's the weather with you?</h1>
        <div className = 'container-row'>
          <Search onSearchChange={handleOnSearchChange}/>
          <button>Clear</button>
        </div>
        
      </header>
      <div>{error? error:''}</div>
      <div className = 'container-row'>
        {currentWeather && <CurrentWeather data = {currentWeather} calculateTempToFarenheit={calculateTempToFarenheit}></CurrentWeather>}
      </div>
      <div className = 'weatherFlex'>
        <div className = 'weatherContainer'>
          <ForecastWeather data = {forecast} calculateTempToFarenheit={calculateTempToFarenheit}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
