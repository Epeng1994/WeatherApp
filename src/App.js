import axios from 'axios'
import React, {useState} from 'react'
import './App.css';
import WeatherDaily from './components/WeatherDaily'
import CurrentWeather from './components/CurrentWeather'



function App() {
  
  const [city, setCity] = useState({
    cityName:'queens',
    cityState:'new york'
  })
  const [error,setError] = useState('')

  const [forecast, setForecast] = useState([])
  const [selectedDate, setSelectedDate] = useState('')

  const handleChange = e =>{
    const {name, value} = e.target
    setCity({...city, [name]: value.toLowerCase()})
  }
  const calculateTempToFarenheit = temp =>{
    return Math.round((temp - 273.15)* 9/5 + 32)
  }

  const handleSubmit =e=>{
    e.preventDefault()
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city.cityName}&limit=5&appid=${process.env.REACT_APP_weatherAPI}`)
      .then(res=>{
        let result = res.data.find(a=>a.state.toLowerCase()===city.cityState) //single city object
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${Math.ceil(result.lat)}&lon=${Math.ceil(result.lon)}&exclude=hourly,minutely&appid=${process.env.REACT_APP_weatherAPI}`)
          .then(res=>{
            setError('')
            let result = res.data.daily.map((a,i)=>{
              const dateConversion = date =>{
                return new Date(date)
              }
                return {
                  rain:a.rain !== undefined ? Math.round(a.rain) : 0,
                  tempMax:calculateTempToFarenheit(a.temp.max),
                  tempMin:calculateTempToFarenheit(a.temp.min),
                  weather: a.weather[0].main,
                  description: a.weather[0].description,
                  date: dateConversion(a.dt*1000),
                  humidity: a.humidity,
                  sunrise:dateConversion(a.sunrise*1000),
                  sunset:dateConversion(a.sunset*1000),
                  wind_speed:a.wind_speed,
                  clouds: a.clouds,
                  count:i
                }
            })
            setForecast(result)
          })
          .catch(err=>{
            setError('Could not find location, please enter another')
            //console.log(err)
          })
      })
      .catch(err=>{
        setError('Could not find location, please enter another')
        //console.log(err)
      })
  }



  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
      <h2>What's the weather with you?</h2>
      <form onSubmit={handleSubmit}>
        <input name = 'cityName' placeholder = 'enter a city' onChange={handleChange}/>
        <input name = 'cityState' placeholder = 'enter a state' onChange={handleChange}/>
        <button>Submit</button>
      </form>
      </header>
      <div>{error? error:''}</div>
      <div className = 'container'>
        {selectedDate ? <CurrentWeather info = {selectedDate}></CurrentWeather> : ''}
      </div>
      <div className = 'weatherFlex'>
        <div className = 'weatherContainer'>
          {
            forecast.map(a=>{
              if(a.count===forecast.length-1){
                return ''
              }else{
                return(
                  <WeatherDaily info={a} setSelectedDate = {setSelectedDate}/>
                )
              }
            })
          }
        </div>
      </div>
      
    </div>
  );
}

export default App;
