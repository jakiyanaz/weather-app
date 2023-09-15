import React, { useState } from 'react'

import search_icon from '../assets/icon1.png';
import oned_icon from '../assets/01d@2x.png';
import onen_icon from '../assets/01n@2x.png';
import twod_icon from '../assets/02d@2x(1).png';
import twon_icon from '../assets/02n@2x.png';
import threed_icon from '../assets/03d@2x.png';
import fourd_icon from '../assets/04d@2x.png';
import nined_icon from '../assets/09d@2x.png';
import tend_icon from '../assets/10d@2x.png';
import tenn_icon from '../assets/10n@2x.png';
import elevend_icon from '../assets/11d@2x.png';
import thirteend_icon from '../assets/13d@2x.png';
import fiftyd_icon from '../assets/50d@2x.png';


const WeatherApp = () => {

    const [weatherData, setWeatherData] = useState({
        dataTemp: "",
        datafeels_like: "",
        dataDescription: "",
        dataLocation: "",
    });
    const [weatherIcon, setWeatherIcon] = useState(oned_icon);

    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };
    const date = new Date;
    let currentDate = date.getDate();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let currentHour = date.getHours();
    let currentMinute = date.getMinutes();
    let ampm = "am";
    if (currentHour===0) currentHour = 12;
    if (currentHour>12) {
        currentHour = currentHour-12;
        ampm = 'pm';
    }
    
    let api_key = `${import.meta.env.VITE_API_KEY}`;
    const weatherDetails = async () => {
        let search = document.getElementById('search');
        let inputValue = search.value;
        if (inputValue === "") {
            return 0;
        }
        else{
            let temp_desc = document.getElementById('temp-desc');
            let locationdiv = document.getElementById('location');
            temp_desc.style.display = 'flex';
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${api_key}`;
            const result = await fetch(url);
            const data = await result.json();
            if(data.cod === '404'){
                temp_desc.style.display = 'none';
                locationdiv.style.display = 'none'
                alert("No such city found");
            }
            setWeatherData({
                dataTemp: Math.floor(data.main.temp) + '°C',
                datafeels_like: data.main.feels_like,
                dataDescription: data.weather[0].description,
                dataLocation: data.name
            });
            if (data.weather[0].icon === "01d") {
                setWeatherIcon(oned_icon);
            }
            else if (data.weather[0].icon === "01n") {
                setWeatherIcon(onen_icon);
            }
            else if (data.weather[0].icon === "02d") {
                setWeatherIcon(twod_icon);
            }
            else if (data.weather[0].icon === "02n") {
                setWeatherIcon(twon_icon);
            }
            else if ((data.weather[0].icon === "03d") || (data.weather[0].icon === "03n")) {
                setWeatherIcon(threed_icon);
            }
            else if ((data.weather[0].icon === "04d") || (data.weather[0].icon === "04n")) {
                setWeatherIcon(fourd_icon);
            }
            else if ((data.weather[0].icon === "09d") || (data.weather[0].icon === "09n")) {
                setWeatherIcon(nined_icon);
            }
            else if (data.weather[0].icon === "10d") {
                setWeatherIcon(tend_icon);
            }
            else if (data.weather[0].icon === "10n") {
                setWeatherIcon(tenn_icon);
            }
            else if ((data.weather[0].icon === "11d") || (data.weather[0].icon === "11n")) {
                setWeatherIcon(elevend_icon);
            }
            else if ((data.weather[0].icon === "13d") || (data.weather[0].icon === "13n")) {
                setWeatherIcon(thirteend_icon);
            }
            else if ((data.weather[0].icon === "50d") || (data.weather[0].icon === "50n")) {
                setWeatherIcon(fiftyd_icon);
            }
            else{
                setWeatherIcon(oned_icon);
            }
        }
        
    }

  return (
    <div id="parent">
        <div className='container'>
            <h1>Weather Update</h1>
            <div id="searchdiv">
            <input type="text" id='search' placeholder='Enter Place....' />
            <img src={search_icon} alt="" id='search-icon' onClick={() => {weatherDetails()}} />
            </div>
            <div id="date-day">
                <p id='show-date'>{currentDate + ' ' + months[currentMonth] + ' ' + currentYear}</p>
            </div>
            <div id="location">
                <h1>{weatherData.dataLocation}</h1>
            </div>
            <div id="temp-desc">
                <div id="temperature" className='c-temp-desc'>
                    <h1>{weatherData.dataTemp}</h1>
                    <p>{"Feels like " + weatherData.datafeels_like}</p>
                </div>
                <div id="description" className='c-temp-desc'>
                    <img src={weatherIcon} alt="" />
                    <p>{weatherData.dataDescription}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp