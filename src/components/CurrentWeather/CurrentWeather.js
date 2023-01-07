import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = props =>{
    const {
        weather, 
        humidity,
        wind_speed, 
        temp,
        feels_like
    } = props.data.current

    return(
        <div className = 'weatherNodeMain'>   
            <div>
                <h1>{props.calculateTempToFarenheit(temp)}°F</h1>    
                <p>{weather[0].description}</p>   
                <div className = 'infoTab'>
                    <p>Feels like: {props.calculateTempToFarenheit(feels_like)}°F</p>
                    <p>Humidity: {humidity}%</p>
                    <p>Wind: {Math.round(wind_speed)} mph</p>
                </div>
            </div>
            <div>
                <img src={`./assets/${weather[0].icon}.png`} className = 'icon-large' alt='weather-icon'/>
            </div>
        </div>
    )
}

export default CurrentWeather


/*
{
    "lat": 41,
    "lon": -73,
    "timezone": "America/New_York",
    "timezone_offset": -18000,
    "current": {
        "dt": 1673022230,
        "sunrise": 1673007415,
        "sunset": 1673041091,
        "temp": 278.31,
        "feels_like": 278.31,
        "pressure": 1014,
        "humidity": 95,
        "dew_point": 277.58,
        "uvi": 0.23,
        "clouds": 100,
        "visibility": 5303,
        "wind_speed": 0.45,
        "wind_deg": 64,
        "wind_gust": 1.79,
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ]
    },
    "daily": [
        {
            "dt": 1673020800,
            "sunrise": 1673007415,
            "sunset": 1673041091,
            "moonrise": 1673039520,
            "moonset": 1673007840,
            "moon_phase": 0.5,
            "temp": {
                "day": 278.31,
                "min": 277.73,
                "max": 279.17,
                "night": 278.13,
                "eve": 278.85,
                "morn": 277.73
            },
            "feels_like": {
                "day": 278.31,
                "night": 275.05,
                "eve": 278.85,
                "morn": 274.66
            },
            "pressure": 1014,
            "humidity": 95,
            "dew_point": 277.58,
            "wind_speed": 5.23,
            "wind_deg": 74,
            "wind_gust": 6.5,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 1,
            "rain": 8.07,
            "uvi": 0.51
        },
    ]
}
*/