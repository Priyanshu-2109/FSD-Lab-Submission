const API_KEY = "c4bedaec330ac664533c0ad14e1d4916";

const form = document.getElementById("weatherform");
const input = document.getElementById("city");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const weatherSection = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
    const city = input.value.trim();
    if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      cityNameEl.textContent = data.name;
      tempEl.textContent = `${data.main.temp}°C`;
      descEl.textContent = data.weather[0].description;
      humidityEl.textContent = `${data.main.humidity}%`;
      windSpeedEl.textContent = `${data.wind.speed} m/s`;
      weatherSection.style.display = "block";
    } else {
      weatherSection.style.display = "none";
      alert("City not found. Please try again.");
    }
  } catch (err) {
    console.error("Error fetching weather:", err);
    alert("Something went wrong. Please try again.");
  }
}
