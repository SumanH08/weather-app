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
    url: "https://katalogg.netlify.app/.netlify/functions/api/suman/weather?location="+city
  }).done(function(res) {
    renderResults(res);
  }).fail(function(jq, status, err){
    showError(jq.status);
  })
}

function renderResults(res) {
  var weatherObj = res;
  if(!weatherObj) return;
  var location = weatherObj.location;
  var prediction = weatherObj.current.condition.text;

  var temp= weatherObj.current.temp_c+"°C";
  var cloudCover = weatherObj.current.cloud+"%";
  var humidity = weatherObj.current.humidity+"%";
  var uvIndex = weatherObj.current.uv;
  var windSpeed = weatherObj.current.wind_mph+" "+"m/s";
  var iconClass = weatherObj.current.condition.icon;

  const localDate = moment(location.localtime);

  // TODO: use for results
  // TODO: determine icon class
  // var iconClass = "ion-cloud";
  // if(prediction.includes('rain')) {
  //   iconClass = "ion-rain"
  // } else if(prediction.includes('rain')) {
     
  // }
  $(".weather-body").html(`<div class="row text-center">
    <div class="prediction">
      <p><span id="location">${location.name}</span></p>
      <p>Local Time: <span>${localDate.format('DD MMM YYYY hh:mm a')}</span></p>
      <p><img src=${iconClass+"?test=123"} alt="Italian Trulli"></i><span id="prediction-text">${prediction}</span></p>
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
      <div class="icon-wrapper"><i
      class="ion-umbrella"></i></div><span id="precip">${uvIndex}</span>
      <p>UV Index</p>
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
