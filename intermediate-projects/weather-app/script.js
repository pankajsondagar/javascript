// API Configuration (using OpenWeatherMap demo data simulation)
let currentUnit = 'celsius';
let currentWeatherData = null;
let recentSearches = [];

// Initialize
loadRecentSearches();
searchWeather('London'); // Default city

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchWeather();
    }
}

async function searchWeather(cityName = null) {
    const city = cityName || document.getElementById('searchInput').value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call with demo data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const weatherData = generateDemoWeatherData(city);
        displayWeather(weatherData);
        
        // Save to recent searches
        addToRecentSearches(city);
        
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
    }
}

function generateDemoWeatherData(city) {
    // Generate realistic demo weather data
    const temp = Math.floor(Math.random() * 30) + 5; // 5-35°C
    const conditions = [
        { main: 'Clear', desc: 'clear sky', icon: '☀️' },
        { main: 'Clouds', desc: 'partly cloudy', icon: '⛅' },
        { main: 'Rain', desc: 'light rain', icon: '🌧️' },
        { main: 'Snow', desc: 'light snow', icon: '❄️' },
        { main: 'Thunderstorm', desc: 'thunderstorm', icon: '⛈️' }
    ];
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
        city: city,
        country: 'Demo Country',
        temperature: temp,
        feelsLike: temp - 2,
        condition: condition.main,
        description: condition.desc,
        icon: condition.icon,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        pressure: Math.floor(Math.random() * 50) + 990,
        visibility: Math.floor(Math.random() * 5) + 5,
        sunrise: '06:30',
        sunset: '18:45',
        forecast: generateForecast()
    };
}

function generateForecast() {
    const days = ['Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat'];
    const conditions = [
        { icon: '☀️', desc: 'Sunny' },
        { icon: '⛅', desc: 'Cloudy' },
        { icon: '🌧️', desc: 'Rainy' },
        { icon: '❄️', desc: 'Snowy' }
    ];
    
    return days.map(day => {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        return {
            day: day,
            icon: condition.icon,
            temp: Math.floor(Math.random() * 25) + 10,
            description: condition.desc
        };
    });
}

function displayWeather(data) {
    currentWeatherData = data;
    
    // Update location
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('country').textContent = data.country;
    
    // Update date/time
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', timeOptions);
    document.getElementById('dateTime').textContent = `${dateStr} | ${timeStr}`;
    
    // Update weather
    updateTemperatureDisplay(data.temperature, data.feelsLike);
    document.getElementById('weatherIcon').textContent = data.icon;
    document.getElementById('weatherDesc').textContent = data.description;
    
    // Update details
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    document.getElementById('sunrise').textContent = data.sunrise;
    document.getElementById('sunset').textContent = data.sunset;
    
    // Update forecast
    displayForecast(data.forecast);
    
    // Show weather card
    hideLoading();
    hideError();
    document.getElementById('weatherCard').classList.add('active');
}

function updateTemperatureDisplay(temp, feelsLike) {
    let displayTemp = temp;
    let displayFeelsLike = feelsLike;
    
    if (currentUnit === 'fahrenheit') {
        displayTemp = celsiusToFahrenheit(temp);
        displayFeelsLike = celsiusToFahrenheit(feelsLike);
    }
    
    document.getElementById('temperature').textContent = Math.round(displayTemp);
    document.getElementById('tempUnit').textContent = currentUnit === 'celsius' ? '°C' : '°F';
    document.getElementById('feelsLike').textContent = `${Math.round(displayFeelsLike)}°${currentUnit === 'celsius' ? 'C' : 'F'}`;
}

function displayForecast(forecast) {
    const forecastGrid = document.getElementById('forecastGrid');
    
    const html = forecast.map(day => {
        let temp = day.temp;
        if (currentUnit === 'fahrenheit') {
            temp = celsiusToFahrenheit(temp);
        }
        
        return `
            <div class="forecast-item">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">${day.icon}</div>
                <div class="forecast-temp">${Math.round(temp)}°${currentUnit === 'celsius' ? 'C' : 'F'}</div>
                <div class="forecast-desc">${day.description}</div>
            </div>
        `;
    }).join('');
    
    forecastGrid.innerHTML = html;
}

function switchUnit(unit) {
    currentUnit = unit;
    
    // Update button states
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update display if we have data
    if (currentWeatherData) {
        updateTemperatureDisplay(currentWeatherData.temperature, currentWeatherData.feelsLike);
        displayForecast(currentWeatherData.forecast);
    }
}

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

async function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            // In a real app, you'd use the coordinates to get city name
            const demoCity = 'Your Location';
            await searchWeather(demoCity);
        },
        (error) => {
            showError('Unable to retrieve your location');
        }
    );
}

function addToRecentSearches(city) {
    // Remove if already exists
    recentSearches = recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    recentSearches.unshift(city);
    
    // Keep only last 5
    recentSearches = recentSearches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    
    displayRecentSearches();
}

function loadRecentSearches() {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
        recentSearches = JSON.parse(saved);
        displayRecentSearches();
    }
}

function displayRecentSearches() {
    const container = document.getElementById('recentSearches');
    
    if (recentSearches.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    const html = recentSearches.map(city => `
        <span class="recent-tag" onclick="searchWeather('${city}')">${city}</span>
    `).join('');
    
    container.innerHTML = html;
}

function showLoading() {
    document.getElementById('loading').classList.add('active');
    document.getElementById('weatherCard').classList.remove('active');
    document.getElementById('error').classList.remove('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

function showError(message) {
    hideLoading();
    document.getElementById('weatherCard').classList.remove('active');
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('error').classList.add('active');
}

function hideError() {
    document.getElementById('error').classList.remove('active');
}