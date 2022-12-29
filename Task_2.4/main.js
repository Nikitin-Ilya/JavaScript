const weatherForecastNow = document.querySelector('#weather-forecast-now');
const weatherForecast = document.querySelector('#weather-forecast');

const input = document.getElementById('input');

input.addEventListener("keyup", e =>{
  if(e.key == "Enter" && input.value != "" && weatherForecastNow && weatherForecast){
    loadWeatherNow(input.value);
    loadWeatherForecast(input.value);
  }

  if(input.value == "" && weatherForecastNow && weatherForecast){
    weatherForecastNow.classList.remove('active');
    weatherForecast.classList.remove('active');
  }
})

// weather forecast now

async function loadWeatherNow(city){
  const weatherNowAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e277e296d769f3ddc7c59e9d2a0b5173`;
  const responseWeatherNow = await fetch(weatherNowAPI, {method: 'GET',})

  const responseResultWeatherNow = await responseWeatherNow.json();

  if (responseWeatherNow.ok) {
    getWeatherNow(responseResultWeatherNow);
  } else {
    weatherForecastNow.classList.add('active');
    weatherForecastNow.innerHTML = responseResultWeatherNow.message;
  }
}

function getWeatherNow(data) {

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
  <div class="whether-now">
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

  weatherForecastNow.classList.add('active');
  weatherForecastNow.innerHTML = template;
}

// weather forecast for 5 days

async function loadWeatherForecast(city){
  const weatherForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=e277e296d769f3ddc7c59e9d2a0b5173`;
  const responseWeatherForecast = await fetch(weatherForecastAPI, {method: 'GET',})

  const responseResultWeatherForecast = await responseWeatherForecast.json();

  if (responseWeatherForecast.ok) {
    getWeatherForecast(responseResultWeatherForecast);
  }
}

function getWeatherForecast(data) {
  let template = ``;
  const options = { weekday: 'short'};
  let prevDay

  data.list.forEach(element => {
    const date = new Date(element.dt_txt);
    const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
    if (prevDay == null || prevDay == weekday){
      prevDay = weekday;
      return;
    }
    prevDay = weekday;
    const tempMax = Math.round(element.main.temp_max);
    const tempMin = Math.round(element.main.temp_min);
    const weatherStatus = element.weather[0].main;
    const weatherIcon = element.weather[0].icon;
  
    template += `
    <div class="whetherForecast">
      <div class="whetherForecast__day">
      ${weekday}
      </div>
      <div class="whetherForecast-icon">
        <img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
      </div>
      <div class="whetherForecast__status">
        ${weatherStatus}
      </div>
      <div class="whetherForecast__temperature">
        ${tempMax}°C
        <div class="whetherForecast__temp-min">${tempMin}°C</div>
      </div>
    </div>`;
  });

  weatherForecast.classList.add('active');
  weatherForecast.innerHTML = template;
}