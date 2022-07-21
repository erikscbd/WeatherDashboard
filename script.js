var weatherFormEl = document.querySelector("#weather-form");
var cityNameEL = document.querySelector("#city");
var weatherSection = document.querySelector("#city-weather-display");
var dailySection = document.querySelector("#daily-weather-display");
var btn = document.querySelector(".btn");

btn.addEventListener("click",function(event) {
  console.log("this is working")
})


function convertToF(kelvin) {
  return Math.floor((kelvin - 273.15) * 1.8) + 32;
}

var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityNameEL.value.trim();

  console.log(cityName);

  if (cityName) {
    getCityWeather(cityName);

    weatherSection.textContent = "";
    cityNameEL.value = "";
  } else {
    alert("Please Enter City");
  }
};

var getCityWeather = function (city) {
  var apikey = "d42360dd80194eb3d86e1aac7890342a";
  var requestURl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d42360dd80194eb3d86e1aac7890342a&units=imperial';

    // var encodedUrl = encodeURI(requestURl);

  //console.log(requestURl);
  fetch(requestURl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          console.log(data);
          var lat = data.coord.lat;
          var long = data.coord.lon;

          fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=d42360dd80194eb3d86e1aac7890342a&units=imperial')
          .then(function(apiData){
            if(apiData.ok){
              var previousHistory = JSON.parse(localStorage.getItem("history")) || [];
              previousHistory.push(city);
              localStorage.setItem("history", JSON.stringify(previousHistory));
              displaySearchHistory();
              return apiData.json();
            }
          }).then(function(apiResults){
            console.log(apiResults);
            weatherSection.innerHTML = `<div class="row">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">Current</span>
                        <p id="city-name">${city}</p>
                        <p>Temperature: ${apiResults.current.temp}</p>
                        <p>Humidity: ${apiResults.current.humidity}</p>
                        <p>Wind Speed: ${apiResults.current.wind_speed}</p>
                        <p>UV Index: ${apiResults.current.uvi}</p>
                        <p>Description: ${apiResults.current.weather[0].description}
                        <img src="http://openweathermap.org/img/wn/${apiResults.current.weather[0].icon}@2x.png" /></p>
                    </div>
                </div>
            </div>`
            var dailyTemplate = "";
            for(var i = 0; i < apiResults.daily.length; i++){
              dailyTemplate += `<div class="col  m3">
              <div class="card">
                  <div class="card-content">
                  
                      <span class="card-title">Daily</span>
                      <p>Temperature: ${apiResults.daily[i].temp.max}</p>
                      <p>Humidity: ${apiResults.daily[i].humidity}</p>
                      <p>Wind Speed: ${apiResults.daily[i].wind_speed}</p>
                      <p>UV Index: ${apiResults.daily[i].uvi}</p>
                      <p>Description: ${apiResults.daily[i].weather[0].description}
                      <img src="http://openweathermap.org/img/wn/${apiResults.daily[i].weather[0].icon}@2x.png" /></p>
                      </div>
                </div>
            </div>`
            }
            dailySection.innerHTML = dailyTemplate;
          })

        })
        // for (let i = 0; i <= data.length; i++) {
        //   displayWeather(data, city);
        //   console.log(data);


        //   var tempCard = document.createElement('div');
        //                 tempCard.classList = 'card horizontal teal';

        //                 var tempDescription = document.createElement('p');
        //                 var tempCurrent = document.createElement('p');
        //                 var tempMin = document.createElement('p');
        //                 var tempMax = document.createElement('p');

        //                 tempCurrent.textContent = 'Temperature: ' + convertToF(weatherData.main.temp) + ' ';

        //                 tempMin.textContent = 'Low: ' + convertToF(weatherData.main.temp_min) + ' ';

        //                 tempMax.textContent = 'Max: ' + convertToF(weatherData.main.temp_max) + ' ';

        //                 tempDescription.textContent = weatherData.weather[0].description + ' ';


        //                 weatherSection.appendChild(tempCard);
        //                 tempCard.appendChild(tempCurrent);
        //                 tempCard.appendChild(tempMax);
        //                 tempCard.appendChild(tempMin);
        //                 tempCard.appendChild(tempDescription);

                       


        // }});
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to load weather");
    });
};

var displaySearchHistory = function () {
  var previousHistory = JSON.parse(localStorage.getItem("history")) || [];
  var historyList = document.querySelector("#history-list");
  historyList.innerHTML = "";
  for (var i = 0; i < previousHistory.length; i++) {
    var historyItem = document.createElement("ul");
    historyItem.textContent = previousHistory[i];
    historyList.appendChild(historyItem);
  }
}

weatherFormEl.addEventListener("submit", formSubmitHandler);

$(document).ready(function () {
  M.updateTextFields();
});

displaySearchHistory()