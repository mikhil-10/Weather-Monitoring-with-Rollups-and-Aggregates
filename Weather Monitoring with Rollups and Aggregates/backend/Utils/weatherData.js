const axios = require('axios');

const API_KEY = '5a62e441182bb06dd88d3e5445ad3ddf'; 

const getWeatherData = async (req, res) => {
    const { city } = req.params;
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        //const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=metric`);

        const currentData = weatherResponse.data;

        const forecastData = forecastResponse.data.list.filter(item => item.dt_txt.includes("24:00:00"));

        const futureWeather = forecastData.map(item => ({
            day: new Date(item.dt * 1000).toLocaleString('en-US', { weekday: 'short' }),
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            icon: item.weather[0].icon,
            description: item.weather[0].descriptio9cn
        }));

        res.json({
            temp: currentData.main.temp,
            feels_like: currentData.main.feels_like,
            humidity: currentData.main.humidity,
            speed: currentData.wind.speed,
            description: currentData.weather[0].description,
            icon: currentData.weather[0].icon,
            futureWeather
        });
    } catch (err) {
        console.error('Error fetching weather data:', err);
        res.status(500).send('Error fetching weather data');
    }
};

module.exports = { getWeatherData };
