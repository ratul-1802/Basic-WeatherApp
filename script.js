const search_btn=document.getElementById('search_btn');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind_speed');
const input_box=document.querySelector('.input_box');
const weather_img=document.querySelector('.weather_img');
const temperature=document.querySelector('.temperature');
const details=document.querySelector('.details');
const error404=document.querySelector('.error404');
const weather=document.querySelector('.weather');
const site=document.querySelector('.location');
const place1=document.querySelector('#place1');
const place2=document.querySelector('#place2');
const container=document.querySelector('.container');
import api_key from "./apikey.js";

async function checkWeather(city){
    //console.log(city);
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data=await fetch(`${url}`).then((resp)=>{
        return resp.json()
    });
    //console.log(weather_data);
    //console.log(weather_data.cod);
    let current_location=input_box.value;
    input_box.value='';
    if(weather_data.cod==='404'){
        error404.style.display='flex';
        weather.style.display='none';
        site.style.display='none';
        return;
    }
    site.style.display='flex';
    place1.innerHTML=`Location`;
    place2.innerHTML=`${current_location}`;
    error404.style.display='none';
    weather.style.display='flex';
    container.style.background='rgba(255,255,255,0.2)';
    //adding the fetched data from api to the website
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    details.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    //adding imgs based on weather
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;
            case 'Haze':
                weather_img.src = "assets/haze.png";
                break;
    }
}


search_btn.addEventListener('click',()=>{
    if(input_box.value!=='')
        checkWeather(input_box.value)
});