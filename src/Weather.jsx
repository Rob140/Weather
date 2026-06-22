import React from "react";
import { useState, useEffect } from "react";
import styles from "./Weather.module.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const myApiKey = "ef6d716724a5b440355b35c2bd118241";

  const fetchData = async () => {
    // if (!city.trim()) {
    //   alert("Please enter a city name");
    //   return;
    // }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}&units=metric`,
      );
      console.log(response, "this is response");
      const data = await response.json();
      console.log(data, "this is data");
      if (data.cod === 200) {
        setWeatherData(data);
        console.log(weatherData);
      } else {
        alert("City not found. Please check the spelling.");
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching weather data. Please try again.");
    }
  };

  return (
    <div className={styles.weatherApp}>
      <div className={styles.card}>
        <h2 className={styles.title}>Weather App</h2>

        <div className={styles.form}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className={styles.input}
          />
          <button className={styles.button} onClick={fetchData}>
            Get Weather
          </button>
        </div>

        {weatherData && (
          <div className={styles.weatherDetails}>
            <h3 className={styles.weatherHeading}>
              {weatherData.name}, {weatherData.sys.country}
            </h3>
            <div className={styles.weatherRow}>
              <span className={styles.weatherLabel}>Temperature</span>
              <span className={styles.weatherValue}>
                {Math.round(weatherData.main.temp)}°C
              </span>
            </div>
            <div className={styles.weatherRow}>
              <span className={styles.weatherLabel}>Condition</span>
              <span className={styles.weatherValue}>
                {weatherData.weather[0].description}
              </span>
            </div>
            <div className={styles.weatherRow}>
              <span className={styles.weatherLabel}>Humidity</span>
              <span className={styles.weatherValue}>
                {weatherData.main.humidity}%
              </span>
            </div>
            <div className={styles.weatherRow}>
              <span className={styles.weatherLabel}>Wind Speed</span>
              <span className={styles.weatherValue}>
                {weatherData.wind.speed} m/s
              </span>
            </div>
            <div className={styles.weatherRow}>
              <span className={styles.weatherLabel}>Sunrise</span>
              <span className={styles.weatherValue}>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
