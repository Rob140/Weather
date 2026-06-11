import React from "react";
import { useState, useEffect } from "react";

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
    <>
      <h2>Weather App</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchData}>Get Weather</button>
      {weatherData && (
        <div className="container">
          <h3>
            {weatherData.name}, {weatherData.sys.country}
          </h3>
          <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>timezon: {weatherData.sys.sunrise}</p>
        </div>
      )}
    </>
  );
};

export default Weather;
