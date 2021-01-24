// Dom manipulation
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  //   const cityDetails = data.cityDetails;
  //   const weather = data.weather;

  // destructure properties
  const { cityDetails, weather } = data;

  // Update details template
  details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>
    `;

  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  // Ternary Operator
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

  time.setAttribute('src', timeSrc);

  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // This is an example of object shorthand notation.
  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener('submit', (e) => {
  // prevent default action
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update UI with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // set local storage
  localStorage.setItem('city', city);
});

// loads the last city that was entered. stored into LS
if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
