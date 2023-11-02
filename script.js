// Selecting DOM elements using JavaScript
const locationInput = document.querySelector(".location-input");
const searchBtn = document.getElementById("search");
const weatherImage = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const notFound = document.querySelector(".not-found-box");
const matchFound = document.querySelector(".match-found-box");
const searchBox = document.querySelector(".search-box");
const closeButton = document.getElementById("close-btn");
const closeBox = document.getElementById("close-box");
const locationOutput = document.getElementById("location");

// Define the API key and constants
const API_KEY = "17acb9071c816e6e82e16aaf15ea0ace";
const EMPTY = "";
const RAIN = "Rain";
const SNOW = "Snow";
const CLOUDS = "Clouds";
const MIST = "Mist";
const CLEAR = "Clear";

// Fetch weather data from the API
async function getWeather(location) {
  if (location === EMPTY) {
    console.log("add");
    searchBox.classList.add("error-class");
    return;
  }

  if (searchBox.classList.contains("error-class")) {
    searchBox.classList.remove("error-class");
  }

  // Construct the API URL
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  const weather_data = await fetch(`${URL}`).then((response) =>
    response.json()
  );

  if (weather_data.cod == "404") {
    matchFound.classList.add("no-show");
    notFound.classList.add("show");
    return;
  } else {
    if (matchFound.classList.contains("no-show")) {
      notFound.classList.remove("show");
      matchFound.classList.remove("no-show");
    }
  }

  // Update the DOM with weather information
  temperature.innerHTML = `${Math.round(
    weather_data.main.temp - 273.15
  )}<sup>°C</sup>`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  windSpeed.innerHTML = `${weather_data.wind.speed} km/h`;
  locationOutput.innerHTML = location;

  // Set the weather image based on the weather condition
  switch (weather_data.weather[0].main) {
    case RAIN:
      weatherImage.src = "images/rain.png";
      break;
    case CLEAR:
      weatherImage.src = "images/cloud.png";
      break;
    case CLEAR:
      weatherImage.src = "images/clear.png";
      break;
    case MIST:
      weatherImage.src = "images/mist.png";
      break;
    case SNOW:
      weatherImage.src = "images/snow.png";
      break;
  }
}

// Event listeners

// Get weather info on click of Search button
searchBtn.addEventListener("click", () => {
  getWeather(locationInput.value);
});

// Get weather info on keypress event for the location input field (Enter key)
locationInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

// Clear the location input value on click of close button
closeButton.addEventListener("click", () => {
  locationInput.value = "";
  closeBox.classList.add("no-show");
  if (matchFound.classList.contains("no-show")) {
    notFound.classList.remove("show");
    matchFound.classList.remove("no-show");
  }
});

// Show or Hide the Close button based on location input field value
locationInput.addEventListener("input", (e) => {
  if (e.target.value === "") {
    closeBox.classList.add("no-show");
  } else {
    if (closeBox.classList.contains("no-show")) {
      closeBox.classList.remove("no-show");
    }
    if (searchBox.classList.contains("error-class")) {
      searchBox.classList.remove("error-class");
    }
  }
});
