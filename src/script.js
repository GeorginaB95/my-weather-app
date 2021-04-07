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

function displayTemperature(response){

   let temperatureElement = document.querySelector("#current-temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   let iconElement = document.querySelector("#icon");
   tempC = response.data.main.temp;
   temperatureElement.innerHTML=Math.round(tempC);
   cityElement.innerHTML = response.data.name;
   descriptionElement.innerHTML = response.data.weather[0].description;
   humidityElement.innerHTML = response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
   dateElement.innerHTML = formatDate(response.data.dt * 1000);
   iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute ("alt", response.data.weather[0].description);
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
}

function displayTempC(event){
    event.preventDefault();
    let tempElement = document.querySelector("#current-temperature");
    tempElement.innerHTML = Math.round(tempC);
}

let tempC = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let tempFLink = document.querySelector("#tempF-link");
tempFLink.addEventListener("click", displayTempF);

let tempCLink = document.querySelector("#tempC-link");
tempCLink.addEventListener("click", displayTempC);

search("London");


