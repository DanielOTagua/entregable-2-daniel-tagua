
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css'
import WeatherCard from './components/WeatherCard';

function App() {
    /**Debajo coloco todo los state */
    const [coords, setCoords] = useState()
    const [weather, setWeather] = useState()
    const [temp, settemp] = useState()


    const success = (pos) => {
      
      setCoords({
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      })
    }
    


    /**Lo siguiente es una peticion Asincronica */

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success)
    }, [])
  
    useEffect(() => {
      if (coords) {
        const apiKey = '7b8fdbefbf875d8a673c475243cd1377'
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}`
        axios.get(URL)
          .then(res => {
            setWeather(res.data)
            
            const celsius = (res.data.main.temp - 273.15).toFixed(1)
            const farenheit = (celsius * (9/5) +32).toFixed(1)
            settemp({celsius,farenheit}) 
          })
          .catch(err => console.log(err)) 
      }
    }, [coords])


    /* console.log(weather) */ 
  return (
    <div className="App">
      {
        weather ?
        <WeatherCard 
         weather={weather}
         temp ={temp}
      />
      :
      <loading/>
      }
      
    </div>
  )
}

export default App
