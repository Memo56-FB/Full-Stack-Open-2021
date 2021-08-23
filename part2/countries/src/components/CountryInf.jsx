import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CountryInf({country}) {

    // const [weather, setWeather] = useState([])
    const [temperature, setTemperature] = useState(null)
    const [weatherImg, setWeatherImg] = useState(null)
    const [wind, setWind] = useState(null)
    const [windDirection, setWindDirection] = useState(null)

    useEffect(()=>{
        let isMounted = true
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
            .then(response => {
                if(isMounted){
                // setWeather(response.data)
                setTemperature(response.data.current.temperature)
                setWeatherImg(response.data.current.weather_icons[0])
                setWind(response.data.current.wind_speed)
                setWindDirection(response.data.current.wind_dir)
                }
            })
            .catch(error => console.error(error))
            return () => {isMounted = false}
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    // console.log(weather)
    const languages = country.languages.map(language =>{
        return(
            <ul key={language.nativeName}>
                <li>{language.name}</li>
            </ul>
        )
        })
    return (
        <React.Fragment>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Spoken Languages</h3>
            {languages}
            <img width="200px" src={country.flag} alt={country.name} />
            <h3>Weather in {country.capital}</h3>
            <p><strong>Temperature:</strong> {temperature} Celcius</p>
            <img src={weatherImg} alt="Img" />
            <p><strong>Wind:</strong> {wind} mph direction {windDirection}</p>
        </React.Fragment>
    )
}
