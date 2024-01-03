// get API 

fetch('https://api.openweathermap.org/data/2.5/weather?q=Victoria,CA&APPID=9134f98b590090eb052a46031e0e3ff6')
.then(response => {
  console.log(response); // check if js fetch success
  return response.json();
})
  // decomposite data which send back from api.openweathermap
  .then(data => {
    console.log(data);
    const weatherDescription = data.weather[0].description;
    var temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherImage = document.querySelector('#weather-image');
    // pass 4 dynamic data  to html file
    document.getElementById('weather-description').innerText = weatherDescription;
    document.getElementById('temperature').innerText = (temperature - 273.15).toFixed(2); //kelvin to celsius
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('wind-speed').innerText = windSpeed;

    switch (weatherDescription) { // swap dif icons for dif weather condictions
      case "broken clouds":
      case "overcast clouds":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/04d.png');
        break;
      case "clear sky":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01d.png');
        break;
      case "few clouds":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/02d.png');
        break;
      case "scattered clouds":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/03d.png');
        break;
      case "shower rain":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/09d.png');
        break;
      case "rain":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/10d.png');
        break;
      case "thunderstorm":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/11d.png');
        break;
      case "snow":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/13d.png');
        break; 
      case "mist":
        weatherImage.setAttribute('src', 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/50d.png');
        break;   
      default:
        console.log("Unknown condiction!");
    }
    
  });
