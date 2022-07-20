import axios from 'axios'
import React, {useState} from 'react'
import './App.css';
import WeatherDaily from './components/WeatherDaily'
import CurrentWeather from './components/CurrentWeather'



function App() {
  
  const [city, setCity] = useState({
    cityName:'',
    cityState:''
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
        console.log(result)
      })
      .catch(err=>{
        setError('Could not find location, please enter another')
        console.log(err)
      })
  }



  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src='./assets/weather.gif' alt='weather gif' className = 'weatherHeader'/>
        </div>
      <h2>What's the weather with you?</h2>
      <h3>Select a date to bring up more information</h3>
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
