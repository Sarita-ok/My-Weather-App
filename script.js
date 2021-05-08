function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Geolocation
function showPosition(position) {
  //let h1 = document.querySelector("#city");

  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "4bf607af66f424ce009f3ab41fd57579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayGeolocationTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);

//Forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forescastHTML = `<div class="row justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forescastHTML =
        forescastHTML +
        ` <div class="col-6 col-lg-2" id="small-icons">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                class="weather-icon-forecast"
                id="icon"
                src="src/images/${forecastDay.weather[0].icon}.png"
                width="35"
              />
              <span class="weather-forecast-temp-max">${Math.round(
                forecastDay.temp.max
              )}°</span> |
              <span class="weather-forecast-temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>`;
    }
  });

  forescastHTML = forescastHTML + `</div>`;
  forecastElement.innerHTML = forescastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4bf607af66f424ce009f3ab41fd57579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function displayGeolocationTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#air-pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `src/images/${weatherIcon}.png`);
}
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#air-pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.list[0].main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.list[0].name;
  humidityElement.innerHTML = response.data.list[0].main.humidity;
  windElement.innerHTML = Math.round(response.data.list[0].wind.speed);
  pressureElement.innerHTML = response.data.list[0].main.pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = response.data.list[0].weather[0].icon;
  iconElement.setAttribute("src", `src/images/${weatherIcon}.png`);

  getForecast(response.data.list[0].coord);
}
function search(city) {
  let apiKey = "4bf607af66f424ce009f3ab41fd57579";

  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-engine");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Paris");
