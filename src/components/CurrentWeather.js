import React from 'react'

const CurrentWeather = props=>{
    const {
        rain, 
        tempMax, 
        tempMin, 
        weather, 
        description, 
        date, 
        humidity,
        sunrise, 
        sunset, 
        wind_speed, 
        clouds} = props.info

    const weatherInfo = date.toString().split(' ').slice(0,4)

    const adjustWeatherIcon = icon =>{
        switch(icon){
            case 'Clouds':
                return './assets/cloudy.png';
            case 'Rain':
                return './assets/rainy.png';
            case 'Clear':
                return './assets/clear.png';
            case 'Sunny':
                return './assets/sunny.png';
            default:
                return;
        }
    }

    return(
        <div className = 'weatherNodeMain'>
            <div className = 'mainDate'><h2>{weatherInfo[0]} {weatherInfo[2]} {weatherInfo[1]} </h2></div>
            <div>
                <img src={adjustWeatherIcon(weather)} className = 'weather-icon' alt='weather-icon'/>
            </div>
            <div className = 'infoTab'>
                <div>
                    <p>{description}</p>  
                    <p>Rain: {rain}%</p> 
                    <p>Max: {tempMax}°</p>
                    <p>Min: {tempMin}°</p>  
                    <p>Humidity: {humidity}</p>
                </div>
                <div>
                    <p>Sunrise: {sunrise.toString().split(' ')[4]}</p>
                    <p>Sunset: {sunset.toString().split(' ')[4]}</p>
                    <p>Wind: {wind_speed} mph</p>
                    <p>Clouds: {clouds} </p>
                </div>
                
                
            </div>
        </div>
    )
}

export default CurrentWeather


