//convert to for each in replacement - EB

function onload() {
   console.log("body is loaded");
   checkDisableGet();

//Listening to the submit form event
   $('#weather-form').submit(function(event){
     event.preventDefault();
     console.log("Form submitted");
     readCity();
   });

//Listening to the click event
   $('#getButton').click(function(event) {
     console.log("clicked");
   })

   $("#city").focus();
}

function readCity() {
  $(".weather-body").html(`<p><img width="24" src="img/loading.svg"/>Loading...</p>`)

  var city = document.getElementById('city').value;

  $.ajax({
    url: "https://instantweatherbot.herokuapp.com/location-query?q="+city
  }).done(function(res) {
    renderResults(res);
  }).fail(function(jq, status, err){
    showError(jq.status);
  })
}

function renderResults(res) {
  var weatherObj = JSON.parse(res);
  var location = weatherObj.location;
  var prediction = weatherObj.weather.hourly.summary;

  var current = weatherObj.weather.currently;
  var temp= current.temperature+"°C";
  var cloudCover = ((current.cloudCover)*100).toFixed(2)+"%";
  var humidity = (current.humidity*100)+"%";
  var precipProbability = current.precipProbability;
  var precipIntensity = current.precipIntensity.toFixed(2)+"mm/hr";
  var windSpeed = current.windSpeed+"m/s";

  // TODO: use for results
  // TODO: determine icon class
  var iconClass = "ion-cloud";
  if(prediction.includes('rain')) {
    iconClass = "ion-rain"
  }
  $(".weather-body").html(`<div class="row text-center">
    <div class="prediction">
      <p>Predictions for <span id="location">${location}</span></p>
      <p><i id="icon" class="${iconClass}"></i><span id="prediction-text">${prediction}</span></p>
    </div>
  </div>

  <div class="results">
  <div class="row">
    <div class="col-md-4">
      <div class="icon-wrapper"><i class="ion-thermometer"></i></div><span id="temp">${temp}</span>
      <p>Temperature</p>
    </div>
    <div class="col-md-4">
      <div class="icon-wrapper"><i
      class="ion-cloud"></i></div><span id="cloud-cover">${cloudCover}</span>
      <p>Cloud cover</p>
    </div>
    <div class="col-md-4">
      <div class="icon-wrapper"><i
      class="ion-waterdrop"></i></div><span id="humid">${humidity}</span>
      <p>Humidity</p>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4">
      <div class="icon-wrapper"><i class="ion-speedometer"></i></div><span id="precip-visible">${precipProbability}</span>
      <p>Probability of rain</p>
    </div>
    <div class="col-md-4">
      <div class="icon-wrapper"><i
      class="ion-umbrella"></i></div><span id="precip">${precipIntensity}</span>
      <p>Precipitation</p>
    </div>
    <div class="col-md-4">
      <div class="icon-wrapper">
        <i class="ion-paper-airplane"></i>
      </div>
      <span id="wind-speed">${windSpeed}</span>
      <p>Wind speed</p>
    </div>
  </div>
  </div>`)

  // DOM manipulation using string that uses differential quotes and addition
  // $(".weather-body").html('<div class="row text-center"> <div class="prediction"> <p>Predictions for <span id="location">'+location+'</span></p> <p><i id="icon"></i><span id="prediction-text">Mostly cloudy until tomorrow night.</span></p></div></div>');
}

function showError(status) {
  if(status==404){
    $(".weather-body").html(`<p class="danger">Location not found</p>`);
  } else if(jq.status==500){
    $(".weather-body").html(`<p class="danger">Error in server</p>`);
  } else{
    $(".weather-body").html(`<p class="danger">Nothing is working, bwahahaha!!!💩</p>`);
  }
}

function checkDisableGet() {
  var city = document.getElementById('city').value;
  if(city == "" || !city) {
    document.getElementById('getButton').disabled = true;
  } else {
    document.getElementById('getButton').disabled = false;
  }
}

function redirectto(){
  var cityname = $("#location").html();
  var url = "https://www.google.com/maps/place/" + cityname;
  window.location.href = url;
}
