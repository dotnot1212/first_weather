// Selecting elements
let temp = document.querySelector('.temperature-value');
let tempMinMax = document.querySelector('.temperature-description');
let location = document.querySelector('.location');
let weatherState = document.querySelector('.state');
let imageElem = document.querySelector('#image');
let containerBody = document.querySelector('.container');

// Weather conditions data
let varietyWeather = [
    { name: 'clear', icon: '/img/icon weather/sunny.png', bg: '/img/ClearSky.jpg' },
    { name: 'clouds', icon: '/img/icon weather/cloudy.png', bg: '/img/cloudy.jpg' },
    { name: 'rain', icon: '/img/icon weather/rain.png', bg: '/img/rainy.jpg' },
    { name: 'thunderstorm', icon: '/img/icon weather/thunderStorm.png', bg: '/img/Thunderstorm.webp' },
    { name: 'snow', icon: '/img/icon weather/snow.png', bg: '/img/Snow.webp' },
    { name: 'haze', icon: '/img/icon weather/haze.png', bg: '/img/MistorFog.jpg' },
    { name: 'mist', icon: '/img/icon weather/haze.png', bg: '/img/MistorFog.jpg' },
    { name: 'fog', icon: '/img/icon weather/haze.png', bg: '/img/MistorFog.jpg' },
];

// Function to fetch weather data
async function getWeather(userCity) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=e445fc7ee481cdba9f0bc766044cb808`);
        let weather = await response.json();
        let weatherList = {
            name: weather.name,
            temp: weather.main.temp,
            minTemp: weather.main.temp_min,
            maxTemp: weather.main.temp_max,
            country: weather.sys.country,
            state: weather.weather[0].main,
            stateDes: weather.weather[0].description,
            windSpeed: weather.wind.speed,
        };
        weatherGenerator(weatherList);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update the UI based on weather data
function weatherGenerator(weather) {
    temp.innerHTML = `${Math.floor(weather.temp - 273.15)}°C`;
    tempMinMax.innerHTML = `${Math.floor(weather.minTemp - 273.15)}°C / ${Math.floor(weather.maxTemp - 273.15)}°C`;
    location.innerHTML = `${weather.name}, ${weather.country}`;
    weatherState.innerHTML = `${weather.state}`;

    let matchingWeather = varietyWeather.find(item => item.name.toLowerCase() === weather.state.toLowerCase());

    if (matchingWeather) {
        imageElem.src = matchingWeather.icon;
        document.body.style.backgroundImage = `url(${matchingWeather.bg})`;
    }

    loadData();
}

// Event listener for user input
document.querySelector('#search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        getWeather(event.target.value);
    }
});

// Function to add and remove animation class
function loadData() {
    containerBody.classList.add('fadeInAnimation');
    setTimeout(function () {
        containerBody.classList.remove('fadeInAnimation');
    }, 1000); // Adjust the timeout based on your animation duration
}

// Run the loadData function after the window has loaded
window.onload = () => {
    setTimeout(loadData, 1000);
};
