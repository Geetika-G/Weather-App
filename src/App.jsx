import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${API_KEY}`
);

      if (!res.ok) {
        throw new Error("City not found");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
  <div className="app">
    <div className="container">
      <h1 className="title">☁️ Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="🌍 Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>📍 {weather.name}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>☁ Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  </div>
);

}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial",
  },
  input: {
    padding: "10px",
    width: "200px",
    marginRight: "10px",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f0f0f0",
    display: "inline-block",
  },
};

export default App;
