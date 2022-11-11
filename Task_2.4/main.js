const widget = document.querySelector('#widget');
const input = document.getElementById('input');

async function loadWeatherNow(city){
  const serverWeatherNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e277e296d769f3ddc7c59e9d2a0b5173`;
  const responseWeatherNow = await fetch(serverWeatherNow, {method: 'GET',})

  const responseResultWeatherNow = await responseWeatherNow.json();

  if (responseWeatherNow.ok) {
    getWeatherNow(responseResultWeatherNow);
  } else {
    widget.classList.add('active');
    widget.innerHTML = responseResultWeatherNow.message;
  }
}

function getWeatherNow(data) {

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

input.addEventListener("keyup", e =>{
  if(e.key == "Enter" && input.value != "" && widget){
    loadWeatherNow(input.value);
  }

  if(input.value == "" && widget){
    widget.classList.remove('active');
  }
})