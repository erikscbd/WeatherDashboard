var weatherFormEl = document.querySelector("#weather-form");
var cityNameEL = document.querySelector("#city");
var weatherSection = document.querySelector("#city-weather-display");
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
  var requestURl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d42360dd80194eb3d86e1aac7890342a';

    // var encodedUrl = encodeURI(requestURl);

  console.log(requestURl);
  fetch(requestURl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

          console.log(data);
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

// for (let i = 0; i <= data.length; i++) {
//   var displayWeather = function (data) {
//     var weatherEL = document.createElement("h3");
//     weatherEL.textContent = data.weather[0].description;
//     weatherEL.textContent = data.main.temp;

//     weatherSection.appendChild(weatherEL);
//   };
// }

weatherFormEl.addEventListener("submit", formSubmitHandler);

$(document).ready(function () {
  M.updateTextFields();
});
