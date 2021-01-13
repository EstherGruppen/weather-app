
function formatDate(date){

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0 ${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
} 

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#icon").setAttribute(
  "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
} 
function search(city) {
    let apiKey = "c813098e209e0e99c21768a60931c14c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c813098e209e0e99c21768a60931c14c&units=metric`;
    axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
}

function searchLocation(position) {
  let apiKey = "c813098e209e0e99c21768a60931c14c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
    
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 20;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 55;
}

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();
 dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
    
let currentCityButton = document.querySelector("#current-city-button");
  currentCityButton.addEventListener("click", getCurrentPosition);
  
search ("Amsterdam");