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

  const resetWeather = e =>{
    setCurrentWeather(null);
    setCurrentForecast([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
        <div className = 'container-row'>
          <Search onSearchChange={handleOnSearchChange}/>
          <button className = 'search-button' onClick={resetWeather}>Clear Search</button>
        </div>
        
      </header>
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
