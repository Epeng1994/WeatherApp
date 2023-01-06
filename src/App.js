import axios from 'axios';
import React, {useState} from 'react';
import './App.css';
// import WeatherDaily from './components/WeatherDaily';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search/search';

function App() {
  const apiID = process.env.REACT_APP_weatherAPI || '99252094471af63f3bc4db3139381388'
  const [currentWeather, ssetCurrentWeather] = useState(null)
  const [forecast, setCurrentForecast] = useState(null)
  const [error,setError] = useState('')

  const handleOnSearchChange = async searchData =>{
    const [latitude,longitude]  = searchData.value.split(' ')

    await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${Math.ceil(latitude)}&lon=${Math.ceil(longitude)}&exclude=hourly,minutely&appid=${apiID}`)
      .then(res=>{
        console.log(res.data)
        ssetCurrentWeather(res.data)
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
        <h1>What's the weather with you?</h1>
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
        <Search onSearchChange={handleOnSearchChange}/>
      </header>
      <div>{error? error:''}</div>
      <div className = 'container'>
        {currentWeather && <CurrentWeather data = {currentWeather} calculateTempToFarenheit={calculateTempToFarenheit}></CurrentWeather>}
      </div>
      <div className = 'weatherFlex'>
        <div className = 'weatherContainer'>
          {/* {
            forecast.map(a=>{
              if(a.count===forecast.length-1){
                return ''
              }else{
                return(
                  <WeatherDaily info={a} setSelectedDate = {setSelectedDate}/>
                )
              }
            })
          } */}
        </div>
      </div>
      
    </div>
  );
}

export default App;
