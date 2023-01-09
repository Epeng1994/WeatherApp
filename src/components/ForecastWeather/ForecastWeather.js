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
                                                <img alt = 'humidity-icon' className = 'icon-small' src= './assets/humidity.png'/>
                                                <p>{item.main.humidity}%</p>                      
                                                <img alt = 'weather' className = 'icon-small' src = {`./assets/${item.weather[0].icon}.png`}/>
                                                <img alt = 'wind-icon' className = 'icon-small' src= './assets/wind.png'/>
                                                <div>{Math.round(item.wind.speed)} mph</div>
                                                <p>{isCelcius ? Math.round(item.main.temp ): CelciusToFarenheit(item.main.temp)}°</p>
                                            </div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Feels like: {isCelcius ? Math.round(item.main.feels_like) : CelciusToFarenheit(item.main.feels_like)}°</p>
                                    </AccordionItemPanel>
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


