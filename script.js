function updateDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let listDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[listDays];
  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let currentDate = (document.querySelector("#weather-date").innerHTML
= updateDate(now));

function showTemperature(response) {
  document.querySelector("#current-city").innerHTML =
  response.data.name;
  document.querySelector("#temperature").innerHTML =
  Math.round(response.data.main.temp);
}

currentDate.innerHTML = updateDate(currentTime);
function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "1249c7a87e8430d0f8a521161ee4206a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#weather__form-location").value;
  search(city);
}
let searchFunction = document.querySelector("#weather__form");
searchFunction.addEventListener("submit", searchCity);
// Current Location
function searchCurrentLocation(position) {
  let apiKey = "1249c7a87e8430d0f8a521161ee4206a";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}
// Temperature Conversion
function convertF(event) {
  event.preventDefault();
  let temperatureConversion = document.querySelector("#temperature");
  temperatureConversion.innerHTML = 48;
}
function convertC(event) {
  event.preventDefault();
  let temperatureConversion = document.querySelector("#temperature");
  temperatureConversion.innerHTML = 9;
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertF);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertC);
let currentLocationButton = document.querySelector("#weather-refresh");
currentLocationButton.addEventListener("click", getCurrentLocation);
search("London");