const express = require('express');
const axios = require('axios');
const router = express.Router();
const Weather = require('../Utils/weatherData');

// Current weather route
router.get('/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a62e441182bb06dd88d3e5445ad3ddf&units=metric`);
        const weatherData = weatherResponse.data;

        const mappedWeatherData = {
            current: {
                name: weatherData.name,
                max: weatherData.main.temp_max,
                min: weatherData.main.temp_min,
                temp: weatherData.main.temp,
                feels_like: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                speed: weatherData.wind.speed,
                visibility: weatherData.visibility,
                icon: weatherData.weather[0].icon,
                description: weatherData.weather[0].description,
                dt: weatherData.dt,
            },
        };

        res.json(mappedWeatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching current weather data.' });
    }
});

// Future weather route
router.get('/forecast/:city', async (req, res) => {
    const city = req.params.city;
    try {
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5a62e441182bb06dd88d3e5445ad3ddf&units=metric`);
        const forecastData = forecastResponse.data.list.slice(0, 7); // Get the next 7 days of forecast data

        const dailyForecast = forecastData.map(data => ({
            dt: data.dt,
            max: data.main.temp_max,
            min: data.main.temp_min,
            temp: data.main.temp,
            icon: data.weather[0].icon, // Get the weather icon code
            description: data.weather[0].description
        }));

        res.json({ daily: dailyForecast });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching forecast data.' });
    }
});

module.exports = router;
