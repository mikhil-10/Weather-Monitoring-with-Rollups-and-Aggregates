import "bootstrap/dist/css/bootstrap.min.css";
import "./WeatherDashboard.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Home() {
    const [city, setCity] = useState('Bangalore');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [weekData, setWeekData] = useState([]);
    const [thresholds, setThresholds] = useState({ tempMax: 35 }); // Default threshold
    const [alert, setAlert] = useState(null); // Alert state
    const [dominantWeather, setDominantWeather] = useState(null);
    const cities = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Hyderabad'];

    const handleCityChange = (event) => setCity(event.target.value);

    const handleThresholdChange = (event) => {
        const { name, value } = event.target;
        setThresholds({ ...thresholds, [name]: Number(value) });
    };
    const determineDominantWeather = (forecastData) => {
        const weatherCount = {};

        forecastData.forEach(day => {
            const weatherCondition = day.weatherDescription.toLowerCase();
            weatherCount[weatherCondition] = (weatherCount[weatherCondition] || 0) + 1;
        });

        const dominantWeatherCondition = Object.keys(weatherCount).reduce((a, b) =>
            weatherCount[a] > weatherCount[b] ? a : b
        );

        setDominantWeather(dominantWeatherCondition);
    };

    const checkThresholds = (currentTemp) => {
        if (currentTemp > thresholds.tempMax) {
            setAlert(`Temperature exceeds ${thresholds.tempMax}°C!`);
            console.warn("Temperature alert triggered!");
        } else {
            setAlert(null); // Clear alert if condition no longer met
        }
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/${city}`);
            const futureResponse = await axios.get(`http://localhost:5000/api/forecast/${city}`);
            const currentWeather = response.data.current;
            console.log(response.data);
            const mappedData = {
                temperature: currentWeather.temp || 0,
                feelsLike: currentWeather.feels_like || 0,
                max: currentWeather.max || 0,
                min: currentWeather.min || 0,
                windSpeed: currentWeather.speed || 0,
                humidity: currentWeather.humidity || 0,
                cityName: currentWeather.name || 'Unknown',
                icon: currentWeather.icon || '',
                weatherDescription: currentWeather.description || 'No description available',
            };

            setWeatherData(mappedData);
            setError(null);

            const futureWeatherData = futureResponse.data.daily || [];
            const mappedForecast = futureWeatherData.map(day => ({
                date: new Date((day.dt * 1000)).toLocaleDateString(),
                max: day.max,
                min: day.min,
                temperature: day.temp || 0,
                icon: day.icon || '',
                weatherDescription: day.description || 'No description available',
            }));
            setWeekData(mappedForecast);
            determineDominantWeather(mappedForecast);
            checkThresholds(mappedData.temperature); // Check temperature against thresholds
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError('City not found or error fetching data.');
            setWeatherData(null);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 600000); // Fetch data every 10 minutes
        return () => clearInterval(interval);
    }, [city]);

    const getDayOfWeek = (timestamp) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(timestamp * 1000);
        return days[date.getUTCDay()];
    };

    const chartData = {
        labels: weekData.map(data => data.date),
        datasets: [{
            label: 'Temperature (°C)',
            data: weekData.map(data => data.temperature),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    };

    return (
        <div className="container-fluid main-container">
            <div className="row">
                <div className="col-md-4 left-panel">
                    <select className="form-select" id="citySelect" value={city} onChange={handleCityChange}>
                        {cities.map((cityOption) => (
                            <option key={cityOption} value={cityOption}>{cityOption}</option>
                        ))}
                    </select>
                    <br />

                    <div className="threshold-config">
                        <h4>Set Temperature Alert Threshold</h4>
                        <input
                            type="number"
                            name="tempMax"
                            value={thresholds.tempMax}
                            onChange={handleThresholdChange}
                            className="form-control"
                            placeholder="Max Temperature (°C)"
                        />
                    </div>

                    {weatherData ? (
                        <div className="weather-info">
                            <h3 className="city-name">{weatherData.cityName}</h3>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <div className="ml-3">
                                    <h2 className="temperature">{weatherData.temperature}°C</h2>
                                    <p>Max: {weatherData.max}°C | Min: {weatherData.min}°C</p>
                                </div>
                            </div>
                            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} alt={weatherData.weatherDescription} className="weather-icon" />
                            <p className="text-uppercase text-center"><strong>{weatherData.weatherDescription}</strong></p>
                            <div className="additional-info text-center">
                                <p><strong>Feels like:</strong> {weatherData.feelsLike}°C</p>
                                <p><strong>Wind Speed:</strong> {weatherData.windSpeed} m/s</p>
                                <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
                                {dominantWeather && (
                                    <div className="dominant-weather text-center">
                                        <h4>Dominant Weather: {dominantWeather}</h4>
                                    </div>
                                )}


                            </div>
                        </div>
                    ) : (
                        <p>Loading weather data...</p>
                    )}

                    {error && <p className="text-danger">{error}</p>}
                    {alert && <div className="alert alert-warning">{alert}</div>}
                </div>

                <div className="col-md-8 right-panel">
                    <h2>Weather Forecast 3 Hours interval</h2>
                    <div className="row week-forecast mb-4">
                        {weekData.map((day, index) => (
                            <div className="col-md-1" style={{ width: "150px" }} key={index}>
                                <div className="highlight-box">
                                    <p>{getDayOfWeek(new Date(day.date).getTime() / 1000)}</p>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                        alt={day.weatherDescription}
                                        className="weather-icon"
                                    />
                                    <p>{day.temperature}°C</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2>Today's Highlights</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="highlight-box p-5">
                                <p>Wind Speed</p>
                                <p>{weatherData?.windSpeed} m/s</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="highlight-box p-5">
                                <p>Humidity</p>
                                <p>{weatherData?.humidity}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
