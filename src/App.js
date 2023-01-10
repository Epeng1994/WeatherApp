import axios from 'axios';
import React, {useState} from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastWeather from './components/ForecastWeather/ForecastWeather';
import Search from './components/Search/search';

function App() {
  const apiID = process.env.REACT_APP_weatherAPI || '99252094471af63f3bc4db3139381388'
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setCurrentForecast] = useState([]);
  const [isCelcius, setIsCelcius] = useState(true);

  const handleOnSearchChange = async searchData =>{
    const [latitude,longitude]  = searchData.value.split(' ')

    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiID}&units=metric`)
    .then(res=>{
      let weatherResult = res.data.list;
      setCurrentWeather({city:res.data.city.name,info:weatherResult[0]});
      setCurrentForecast([weatherResult[8],weatherResult[16],weatherResult[24],weatherResult[32]]);
    })
    .catch(err=>{
      console.log(err)
    });
  };

  const CelciusToFarenheit = temp =>{
    return Math.round((temp*9/5)+32)
  }

   const alterFarenheitAndCelcius = e =>{
    setIsCelcius(!isCelcius);
  }

  const resetWeather = e =>{
    setCurrentWeather(null);
    setCurrentForecast([]);
    setIsCelcius(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className = 'search-button' onClick = {()=>alterFarenheitAndCelcius()}>Change to {isCelcius ? 'Farenheit' : 'Celcius'}</button>
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
        <div className = 'container-row'>
          <Search onSearchChange={handleOnSearchChange}/>
          <button className = 'search-button' onClick={resetWeather}>Clear Search</button>
        </div>
      </header>
      <div className = 'container-row'>
        {currentWeather && <CurrentWeather data = {currentWeather} isCelcius = {isCelcius} CelciusToFarenheit={CelciusToFarenheit}></CurrentWeather>}
      </div>
      <div className = 'weatherFlex'>
        <div className = 'weatherContainer'>
          <ForecastWeather data = {forecast} CelciusToFarenheit = {CelciusToFarenheit} isCelcius = {isCelcius}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
