const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

const api_key = "f82313722779dd4fc2fc4c36bdf665fc";

async function checkWeather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${api_key}`;
    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if(weather_data.cod === '404'){
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        console.log("Weather data fetched:", weather_data);
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        // Correctly convert temperature from Kelvin to Celsius
        const tempInCelsius = weather_data.main.temp - 273.15;
        temperature.innerHTML = `${Math.round(tempInCelsius)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

        switch(weather_data.weather[0].main){
            case 'Clouds':
                weather_img.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/assets/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/assets/snow.png";
                break;
            default:
                weather_img.src = "/assets/default.png";
                break;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

function debounce(func, delay){
    let debounceTimer;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

searchBtn.addEventListener('click', debounce(() => {
    checkWeather(inputBox.value);
}, 500));
