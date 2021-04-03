function displayTemperature(response){

   let temperatureElement = document.querySelector("#current-temperature");
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   temperatureElement.innerHTML=Math.round(response.data.main.temp);
   cityElement.innerHTML=response.data.name;
   descriptionElement.innerHTML=response.data.weather[0].description;
   humidityElement.innerHTML=response.data.main.humidity;
   windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey="d8db460d456f3ec32826f6858578adce";
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);