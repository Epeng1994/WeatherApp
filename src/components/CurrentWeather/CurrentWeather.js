import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = props =>{
    const { data, isCelcius, CelciusToFarenheit } = props

    return(
        <div className = 'weatherNodeMain'>   
            <div className ='weather-info'>
                <h1>{isCelcius ? Math.round(data.info.main.temp) : CelciusToFarenheit(data.info.main.temp)}°</h1>    
                <h2>{data.city}</h2>
                <p>{data.info.weather[0].description}</p>   
                <div>
                    <p>Feels like: {isCelcius ? Math.round(data.info.main.feels_like) : CelciusToFarenheit(data.info.main.feels_like)}°</p>
                    <p>Humidity: {data.info.main.humidity}%</p>
                    <p>Wind: {Math.round(data.info.wind.speed)} mph</p>
                </div>
            </div>
            <div>
                <img src={`./assets/${data.info.weather[0].icon}.png`} className = 'icon-large' alt='weather-icon'/>
            </div>
        </div>
    )
}

export default CurrentWeather

