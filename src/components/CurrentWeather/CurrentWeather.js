import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = props =>{
    const { data, isCelcius, CelciusToFarenheit } = props

    return(
        <div className = 'weatherNodeMain'>   
            <div>
                <h1>{isCelcius ? Math.round(data.main.temp) : CelciusToFarenheit(data.main.temp)}°</h1>    
                <p>{data.weather[0].description}</p>   
                <div className = 'infoTab'>
                    <p>Feels like: {isCelcius ? Math.round(data.main.feels_like) : CelciusToFarenheit(data.main.feels_like)}°</p>
                    <p>Humidity: {data.main.humidity}%</p>
                    <p>Wind: {Math.round(data.wind.speed)} mph</p>
                </div>
            </div>
            <div>
                <img src={`./assets/${data.weather[0].icon}.png`} className = 'icon-large' alt='weather-icon'/>
            </div>
        </div>
    )
}

export default CurrentWeather

/*
{
    "dt": 1673287200,
    "main": {
        "temp": 20.58,
        "feels_like": 20.68,
        "temp_min": 20.58,
        "temp_max": 21.13,
        "pressure": 1019,
        "sea_level": 1019,
        "grnd_level": 1019,
        "humidity": 76,
        "temp_kf": -0.55
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01n"
        }
    ],
    "clouds": {
        "all": 0
    },
    "wind": {
        "speed": 2.68,
        "deg": 40,
        "gust": 2.69
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
        "pod": "n"
    },
    "dt_txt": "2023-01-09 18:00:00"
}
*/