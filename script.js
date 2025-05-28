const API_KEY = "f1bb637ba01a10e91be6b52a5227db1b"; // Clef API OpenWeather
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
    );
    const data = await response.json();

    if (data.cod === 200) {
      updateWeatherUI(data);
    } else {
      alert("Ville non trouvée. Veuillez réessayer.");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
}

function updateWeatherUI(data) {
  document.getElementById(
    "location"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById(
    "humidity"
  ).textContent = `Humidité: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Vent: ${Math.round(
    data.wind.speed * 3.6
  )} km/h`;
}

// Chargement initial
getWeatherData("Abidjan");
