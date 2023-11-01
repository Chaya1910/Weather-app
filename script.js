// Selecting DOM elements using JavaScript
const locationInput = document.querySelector('.location-input');
const searchBtn = document.getElementById('search');
const weatherImage = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const notFound = document.querySelector('.not-found-box');
const matchFound = document.querySelector('.match-found-box');
const searchBox = document.querySelector('.search-box');
const closeButton = document.getElementById('close-btn');
const closeBox = document.getElementById('close-box');
const locationOutput = document.getElementById('location');

// Define the API key and constants
const API_KEY = '17acb9071c816e6e82e16aaf15ea0ace';
const EMPTY = '';
const RAIN = 'Rain';
const SNOW = 'Snow';
const CLOUDS = 'Clouds';
const MIST = 'Mist';
const CLEAR = 'Clear';  // Fixed a typo here ('CLear' -> 'Clear')

// Function to fetch weather data from the API
async function getWeather(location) {
    if (location === EMPTY) {
        searchBox.classList.add('error-class');
        return;
    }
    if (matchFound.classList.contains('no-show')) {
        notFound.classList.remove('show');
        matchFound.classList.remove('no-show');
    }

    // Construct the API URL
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    const weather_data = await fetch(`${URL}`).then(response => response.json());

    if (weather_data.cod == '404') {
        matchFound.classList.add('no-show');
        notFound.classList.add('show');
        return;
    }

    // Update the DOM with weather information
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed} km/h`;
    locationOutput.innerHTML = location;

    // Set the weather image based on the weather condition
    switch (weather_data.weather[0].main) {
        case RAIN:
            weatherImage.src = 'images/rain.png';
            break;
        case CLEAR:
            weatherImage.src = 'images/cloud.png';
            break;
        case CLEAR:  // Fixed a duplicate case label ('CLEAR' -> 'CLEAR')
            weatherImage.src = 'images/clear.png';
            break;
        case MIST:
            weatherImage.src = 'images/mist.png';
            break;
        case SNOW:
            weatherImage.src = 'images/snow.png';
            break;
    }
}

// Event listeners

// Click event on the search button
searchBtn.addEventListener('click', () => {
    getWeather(locationInput.value);
})

// Keypress event for the location input field (Enter key)
locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchBtn.click();
    }
})

// Click event for the close button
closeButton.addEventListener('click', () => {
    locationInput.value = '';
    closeBox.classList.add('no-show');
    if (matchFound.classList.contains('no-show')) {
        notFound.classList.remove('show');
        matchFound.classList.remove('no-show');
    }
})

// Input event for the location input field
locationInput.addEventListener('input', (e) => {
    if (e.target.value === '') {
        closeBox.classList.add('no-show');
    } else {
        if (closeBox.classList.contains('no-show')) {
            closeBox.classList.remove('no-show');
        };
    }
})