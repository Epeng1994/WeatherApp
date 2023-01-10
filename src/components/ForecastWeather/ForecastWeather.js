import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import './ForecastWeather.css';

const WeatherDaily = (props) =>{
 
    const { CelciusToFarenheit,data,isCelcius } = props;

    return(
        <>
            <Accordion allowZeroExpanded>
                <AccordionItem>
                    {
                        data.map((item,idx)=>{
                            return(
                                <>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <div className = 'forecast-line' id = {idx}>
                                                <h3>{new Date(item.dt*1000).toDateString().slice(0,3)}</h3>
                                                <p>{item.weather[0].description}</p>  
                                                <img alt = 'weather' className = 'icon-small' src = {`./assets/${item.weather[0].icon}.png`}/>
                                                <p>{isCelcius ? Math.round(item.main.temp ): CelciusToFarenheit(item.main.temp)}°</p>
                                                <img alt = 'humidity-icon' className = 'icon-small' src= './assets/humidity.png'/>
                                                <p>{item.main.humidity}%</p>                                
                                                <img alt = 'wind-icon' className = 'icon-small' src= './assets/wind.png'/>
                                                <div>{Math.round(item.wind.speed)} mph</div>
                                                
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                </>   
                            )
                        })
                    }
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default WeatherDaily


