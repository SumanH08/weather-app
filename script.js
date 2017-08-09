function onload() {
   console.log("body is loaded");
}

function readCity() {
  var city = document.getElementById('city').value;
  console.log(city);
}

function checkDisableGet() {
  var city = document.getElementById('city').value;
  if(city == "" || !city) {
    document.getElementById('getButton').disabled = true;
  } else {
    document.getElementById('getButton').disabled = false;
  }
}
