const weatherInfo = document.getElementById('weather-info');

const apiKey = '935a74ac2db6a17a6152cd650faa5211'; //  API key
const apiUrl = 'https://api.openweathermap.org/data/2.5';

async function getWeather(){
  const location = document.getElementById('location-input').value;
  if (!location) {
    alert("Please enter a city.")
    return;
  }
  const curWeaterUrl = `${apiUrl}/weather?q=${location}&appid=${apiKey}&units=metric`;
  const forecastUrl = `${apiUrl}/forecast?q=${location}&appid=${apiKey}&units=metric`;

  await fetch (curWeaterUrl)
    .then(response => response.json())
    .then(data => {
      console.log("data code: ",data.cod)
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fatching weather data:', error);
      alert('Error fatching weather data. please try again.');
    });

  await fetch (forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayforecast(data.list);
    })
    .catch(error => {
      console.error('Error fatching forecast data:', error);
      alert('Error fatching forecast data. please try again.');
    });
}

function displayWeather(data) {
  const { main, weather, name } = data;
  const temperature = main.temp;
  const weatherCondition = weather[0].main;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  if (data.cod === '404'){
    `<div class="weather-condition"><p>${data.message}</p></div>`
  }
  else{
    weatherInfo.innerHTML = `
      <img class="weather-icon" src="${iconUrl}" alt="${weatherCondition}" style="display: block">
      <div class="weather-condition">${weatherCondition}</div>
      <div class="weather-details">
        <p>Location: ${name}</p>
        <p>Temperature: ${temperature} &#8451;</p>
      </div>
    `;
  }
}

function displayforecast (hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = item.main.temp; 
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;
      
      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}



