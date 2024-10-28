const API_KEY = 'cba8f874d14449c787d44612242110';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const weatherIcon = document.getElementById('weather-icon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const notification = document.getElementById('notification');


function updateWeatherUI(data) {
    cityName.textContent = data.location.name;
    temperature.textContent = Math.round(data.current.temp_c);
    weatherDescription.textContent = data.current.condition.text;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    humidity.textContent = data.current.humidity;
    windSpeed.textContent = data.current.wind_kph;
}

function showNotification() {
    notification.classList.add('show');
    console.log("Notification shown");
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const searchWeather = async () => {
    const city = cityInput.value.trim();
    showNotification();
    if (city) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            updateWeatherUI(weatherData);
        }
    }
};

searchBtn.addEventListener('click', searchWeather);

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${latitude},${longitude}`);
            const data = await response.json();
            updateWeatherUI(data);
        }, (error) => {
            console.error('Error getting user location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

window.addEventListener('load', getUserLocation);