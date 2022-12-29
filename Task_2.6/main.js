const Api = "https://restcountries.com/v3.1/all";
const select = document.getElementById("search__select");
const searchInput = document.getElementById("search__input");

let countries;

window.onload = () => {
  getCountries(Api)
};

async function getCountries(api) {
  const res = await fetch(api);
  countries = await res.json();

  showCountries(countries);
}

const showCountries = (countries) => {
  const countryBox = document.getElementById("countries-list");
  countryBox.innerHTML = "";
  let countryElements = "";

  countries.sort(function(obj1, obj2) {
    if (obj1.name.common < obj2.name.common) return -1;
    if (obj1.name.common > obj2.name.common) return 1;
    return 0;
  });
  
  countries.forEach((country) => {

    countryElements +=
    `<div class="country">
      <img src="${country.flags.svg}" alt="Error!"/>

      <div class="country__info">
        <div class="country__name">
          <h3>${country.name.common}</h3>
        </div>

        <div>
          <span>Population : </span>${country.population}
        </div>

        <div class="country__region">
          <span>Region : </span>
          ${country.region}
        </div>

        <div>
          <span>Capital : </span>
          ${country.capital}
        </div> 
      </div>

    </div>`;
  });

  countryBox.innerHTML = countryElements;
};

function filterByRegion(selectedRegion) {
  const region = selectedRegion.value;
  if (region == "All"){
    getCountries(Api);
  }
  else{
    const apiRegion = `https://restcountries.com/v3.1/region/${region}`;
    getCountries(apiRegion);
  }
};

searchInput.addEventListener("input", (e) => {
  e.preventDefault();
  const {value} = e.target;
  const arrayNames = countries.filter((item) => {
    const countryName = item.name.common.toLowerCase();
    if (countryName.indexOf(value) !== -1) {
      return item;
    }
  });

  showCountries(arrayNames);
});

const theme = document.getElementById("header__mode");
const body = document.querySelector("body");

theme.addEventListener("click", () => {
  if(body.classList.contains("dark")){
    theme.innerHTML = `<i class="fas fa-moon"></i> Dark Mode`;
    body.classList.remove("dark");
  }
  else{
    theme.innerHTML = `<i class="fas fa-moon"></i> Light Mode`;
    body.classList.add("dark");
  }
});

