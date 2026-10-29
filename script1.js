// This app does not search for any default city. It only requests weather
// after the user submits the location form.
const API_KEY = "3cd6be0f43ec4c919fa122429261022";

const form = document.getElementById("weather-form");
const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const statusMessage = document.getElementById("status");
const weatherCard = document.getElementById("weather-card");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = locationInput.value.trim();

  if (!location) {
    statusMessage.textContent = "Please enter a city or location.";
    locationInput.focus();
    return;
  }

  await getWeather(location);
});

async function getWeather(location) {
  searchButton.disabled = true;
  searchButton.textContent = "Loading...";
  statusMessage.textContent = `Fetching weather for ${location}...`;

  try {
    const url = new URL("https://api.weatherapi.com/v1/current.json");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("q", location);
    url.searchParams.set("aqi", "yes");

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `Request failed (${response.status}).`);
    }

    displayWeather(data);
    statusMessage.textContent = "";
  } catch (error) {
    weatherCard.hidden = true;
    if (error instanceof TypeError) {
      statusMessage.textContent = "Could not connect to WeatherAPI. Check your internet connection and try again.";
    } else {
      statusMessage.textContent = error.message || "Something went wrong. Please try again.";
    }
    console.error("Weather lookup failed:", error);
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Get Weather";
  }
}

function displayWeather(data) {
  const place = data.location;
  const current = data.current;

  document.getElementById("city").textContent = `${place.name}, ${place.region ? place.region + ", " : ""}${place.country}`;
  document.getElementById("local-time").textContent = `Local time: ${place.localtime}`;
  document.getElementById("temperature").textContent = Math.round(current.temp_c);
  document.getElementById("condition").textContent = current.condition.text;

  const icon = document.getElementById("weather-icon");
  icon.src = current.condition.icon.startsWith("//")
    ? `https:${current.condition.icon}`
    : current.condition.icon;
  icon.alt = current.condition.text;

  document.getElementById("feels-like").textContent = `${Math.round(current.feelslike_c)}°C`;
  document.getElementById("humidity").textContent = `${current.humidity}%`;
  document.getElementById("wind").textContent = `${current.wind_kph} km/h`;
  document.getElementById("uv").textContent = current.uv;
  document.getElementById("updated").textContent = `Last updated: ${current.last_updated}`;
  weatherCard.hidden = false;
}
