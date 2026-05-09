import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_KEY = "6720528385afffd66194d0260b804a46";


export default function WeatherApp() {
  const [city, setCity] = useState("Antananarivo");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},MG&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h1 style={styles.title}>🌤️ Météo eto Dago</h1>

        <div style={styles.searchBox}>
          <input
            style={styles.input}
            placeholder="Ville (ex: Toamasina)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button style={styles.button} onClick={fetchWeather}>
            Rechercher
          </button>
        </div>

        {loading && <p style={styles.text}>Chargement...</p>}

        {weather && weather.main && (
          <div style={styles.result}>
            <h2 style={styles.city}>{weather.name}</h2>
            <p style={styles.temp}>{Math.round(weather.main.temp)}°C</p>
            <p style={styles.text}>{weather.weather[0].description}</p>
            <p style={styles.text}>💧 Humidité: {weather.main.humidity}%</p>
            <p style={styles.text}>🌬️ Vent: {weather.wind.speed} m/s</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    color: "#fff",
  },

  title: {
    marginBottom: "20px",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },

  result: {
    marginTop: "20px",
  },

  city: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  temp: {
    fontSize: "40px",
    margin: "10px 0",
  },

  text: {
    fontSize: "16px",
  },
};
