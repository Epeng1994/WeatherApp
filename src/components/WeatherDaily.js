import React from 'react'

const WeatherDaily = props =>{
    const {rain, tempMax, tempMin, weather, description, date} = props.info
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
        <div className = 'weatherNode' onClick = {()=>props.setSelectedDate(props.info)}>
            <h2>{weatherInfo[0].slice(0,3)}</h2>
            <h3>{weatherInfo[2]} {weatherInfo[1]}</h3>
            <img src={adjustWeatherIcon(weather)} className = 'weather-icon' alt='weather-icon'/>
            <p>{description}</p>  
            <p>Rain: {rain}%</p> 
            <p>Max: {tempMax}°</p>
            <p>Min: {tempMin}°</p>  
        </div>
    )
}

export default WeatherDaily


