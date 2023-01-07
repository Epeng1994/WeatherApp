import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import './ForecastWeather.css';

const WeatherDaily = ({data}) =>{
 
    return(
        <>
            <Accordion allowZeroExpanded>
                <AccordionItem key = {1}>
                    {
                        data.map((item,idx)=>{
                            return(
                                <>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <div className = 'forecast-line'>
                                                <h3>{new Date(item.dt*1000).toDateString().slice(0,3)}</h3>
                                                <img alt = 'humidity-icon' className = 'icon-small' src= './assets/humidity.png'/>
                                                <p>{item.main.humidity}%</p>                      
                                                <img alt = 'weather' className = 'icon-small' src = {`./assets/${item.weather[0].icon}.png`}/>
                                                <img alt = 'wind-icon' className = 'icon-small' src= './assets/wind.png'/>
                                                <div>{Math.round(item.wind.speed)} mph</div>
                                                <p>{Math.round(item.main.temp)}°F</p>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>

                                    </AccordionItemPanel>
                                </>   
                            )
                        })
                    }
                </AccordionItem>
            </Accordion>
        </>
    )
}//Weekday, %rain, icon, maxtemp, mintemp

export default WeatherDaily


/*
{
    "dt": 1673049600,
    "main": {
        "temp": 293.4,
        "feels_like": 293.52,
        "temp_min": 293.4,
        "temp_max": 294.37,
        "pressure": 1019,
        "sea_level": 1019,
        "grnd_level": 1018,
        "humidity": 78,
        "temp_kf": -0.97
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02n"
        }
    ],
    "clouds": {
        "all": 22
    },
    "wind": {
        "speed": 6.94,
        "deg": 17,
        "gust": 7.56
    },
    "visibility": 10000,
    "pop": 0,
    "sys": {
        "pod": "n"
    },
    "dt_txt": "2023-01-07 00:00:00"
}
*/