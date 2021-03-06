function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        minutes = `0${minutes}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


function formatDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days =["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]

return days[day]; 

}


function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 6){
    forecastHTML = forecastHTML + 
          `<div class="col-2 forecast-element">
            <span class="forecast-day">
            ${formatDay(forecastDay.dt)}
            </span>
             </br>
             <span class="forecast-icon">
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Weather Icon" width=50/>
            </span>
            <br> 
            <div class="weather-forecast-temperatures">
            <span class="forecast-temp-high">
             ${Math.round(forecastDay.temp.max)}˚ 
            </span> 
            <span class="forecast-temp-low">
            ${Math.round(forecastDay.temp.min)}˚
            </span>
          </div>
        </div>`;}
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
let apiKey= "d8db460d456f3ec32826f6858578adce";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){

   let temperatureElement = document.querySelector("#current-temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   let iconElement = document.querySelector("#icon");
   let feelsLikeElement = document.querySelector("#feels-like");
   tempC = response.data.main.temp;
   temperatureElement.innerHTML=Math.round(tempC);
   cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
   windElement.innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatDate(response.data.dt * 1000);
   iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute ("alt", response.data.weather[0].description);
   getForecast(response.data.coord);
}

function search(city){
let apiKey="d8db460d456f3ec32826f6858578adce";
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayTemperature);
}

function submitCity(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayTempF(event){
    event.preventDefault();
    let tempF = (tempC * 9) / 5 + 32;
    let tempElement = document.querySelector("#current-temperature");
    tempElement.innerHTML = Math.round(tempF);
    tempCLink.classList.remove("active");
    tempFLink.classList.add("active");
}

function displayTempC(event){
    event.preventDefault();
    let tempElement = document.querySelector("#current-temperature");
    tempElement.innerHTML = Math.round(tempC);
    tempCLink.classList.add("active");
    tempFLink.classList.remove("active");
}

function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d8db460d456f3ec32826f6858578adce";
  let units = "metric";
  let apiLatUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiLatUrl).then(displayTemperature);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}


let tempC = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let tempFLink = document.querySelector("#tempF-link");
tempFLink.addEventListener("click", displayTempF);

let tempCLink = document.querySelector("#tempC-link");
tempCLink.addEventListener("click", displayTempC);


let currentButton = document.querySelector("#location-btn");
currentButton.addEventListener("click", getPosition);

search("London");
displayForecast();

