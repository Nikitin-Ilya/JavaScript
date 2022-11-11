'use strict'

const widget = document.querySelector('#widget');
//const weatherNow = document.querySelector('#whether-now');
const weatherForecast = document.querySelector('#weather-forecast');
const input = document.getElementById('input');

async function loadWeatherNow(city){
  /*weatherNow.innerHTML = `
  <div class="whether-now__main">
    <div class="whether-now__temperature">
      <div class="whether-now__feels-like"></div>
    </div>
    <div class="whether-now__desc"></div>
  </div>`;*/
  const serverWeatherNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e277e296d769f3ddc7c59e9d2a0b5173`;
  const responseWeatherNow = await fetch(serverWeatherNow, {method: 'GET',})

  const responseResultWeatherNow = await responseWeatherNow.json();

  if (responseWeatherNow.ok) {
    getWeatherNow(responseResultWeatherNow);
  } else {
    widget.innerHTML = responseResultWeatherNow.message;
  }
}

function getWeatherNow(data) {

  //console.log(data);
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
  <div class="whether-now" id="whether-now">
    <div class="whether-now__main">
      <div class="whether-now__temperature">
        ${temp}°C
        <div class="whether-now__feels-like">Feels like ${feelsLike}°C</div>
      </div>
      <div class="whether-now__status">
        ${weatherStatus}
        <div class="whether-now__city">${location}</div>
      </div>
      <div class="whether-icon">
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
      </div>
    </div>
  </div>`;

  widget.classList.add('active');
  widget.innerHTML = template;
}

/*async function loadWeatherForecast(city){
  const serverWeatherforecast = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${5}&appid=0148b448e8aa2eec0882bb2dad28672b`;
  const responseWeatherforecast = await fetch(serverWeatherforecast, {method: 'GET',})

  const responseResultWeatherForecast = await responseWeatherforecast.json();

  if (responseWeatherforecast.ok) {
    getWeatherForecast(responseResultWeatherForecast);
  } else {
    weatherForecast.innerHTML = responseResultWeatherForecast.message;
  }
}

function getWeatherForecast(data) {

  console.log(data);
  console.log(data.list);
  let template;

  data.list.forEach(day => {
    const tempDay = Math.round(day.day);
    const tempNight = Math.round(day.night);
    const weatherStatus = day.weather.main;
    const weatherIcon = data.weather.icon;

    template += `
      <div class="weather-forecast__item">
        <div class="weather-forecast__day">1</div>
        <div class="weather-forecast__icon">
          <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
        <div class="weather-forecast__status">${weatherStatus}</div>
        <div class="weather-forecast__temp">
          <div class="weather-forecast__temp-day">${tempDay}°C</div>
          <div class="weather-forecast__temp-night">${tempNight}°C</div>
        </div>
      </div>`
  });

  weatherForecast.innerHTML = template;
}*/

input.addEventListener("keyup", e =>{
  if(e.key == "Enter" && input.value != "" && widget){
    loadWeatherNow(input.value);
    //loadWeatherForecast(input.value);
  }
})