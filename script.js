function onload() {
   console.log("body is loaded");
}

function readCity() {
  var city = document.getElementById('city').value;
  console.log(city);

  $.ajax({
    url: "https://instantweatherbot.herokuapp.com/location-query?q="+city
  }).done(function(res) {
    console.log(res);
    var weatherObj = JSON.parse(res);
    console.log(weatherObj);
    var location = weatherObj.location;
    $('#location').html(location);

    var prediction = weatherObj.weather.hourly.summary;
    console.log(prediction);
    $("#prediction-text").html(prediction);
  })

}

function checkDisableGet() {
  var city = document.getElementById('city').value;
  if(city == "" || !city) {
    document.getElementById('getButton').disabled = true;
  } else {
    document.getElementById('getButton').disabled = false;
  }
}
