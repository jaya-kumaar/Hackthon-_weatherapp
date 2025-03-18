const apikey = "133738109fabd0799be667615c08af94"; //Personal API Key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //API URL
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (city === "") {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
    return;
  }

  try {
    const weather = await fetch(apiUrl + city + `&appid=${apikey}`);
    if (!weather.ok) {
      alert("City Name Not Match");
      throw new Error(`HTTP error! status: ${weather.status}`);
    }
    const data = await weather.json();

    if (data.cod == "404") {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/rain.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/clear.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "assets/snow.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/mist.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});
searchbox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkWeather(searchbox.value);
  }
});
