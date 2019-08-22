function startSkycons () {
	
	var icons = new Skycons ({"color": "orange"});
	
	icons.set("clear-day", Skycons.CLEAR_DAY);
	icons.set("clear-night", Skycons.CLEAR_NIGHT);
	icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
	icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
	icons.set("cloudy", Skycons.CLOUDY);
	icons.set("rain", Skycons.RAIN);
	icons.set("sleet", Skycons.SLEET);
	icons.set("snow", Skycons.SNOW);
	icons.set("wind", Skycons.WIND);
	icons.set("fog", Skycons.FOG);

	 switch (weatherIcon) {
        case "01d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.CLEAR_DAY);
          break;
        case "01n":
          skycons.add(document.getElementById("weatherIcon"), Skycons.CLEAR_NIGHT);
          break;
        case "02d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.PARTLY_CLOUDY_DAY);
          break;
        case "02n":
          skycons.add(document.getElementById("weatherIcon"), Skycons.PARTLY_CLOUDY_NIGHT);
          break;
        case "03d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.CLOUDY);
          break;
        case "09d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.RAIN);
          break;
        case "13d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.SNOW);
          break;
        case "50d":
          skycons.add(document.getElementById("weatherIcon"), Skycons.FOG);
          break;

        default:

    }
	
	icons.play();
}


function weather(s) {
	var location = document.getElementById("location");
	var code = s;
	var url = "https://api.darksky.net/forecast/";
	
	navigator.geolocation.getCurrentPosition(success, error);
	
	function success(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		
		location.innerHTML = 
			"Latitude is " + latitude + "° Longitude is " + longitude + "°";
			
		$.getJSON(
		  url + code + "/" + latitude + "," + longitude + "?callback=?",
		  function(data) {
			$("#temp").html(data.currently.temperature + "° F");
			$("#minutely").html(data.minutely.summary);
			$("#hourly").html(data.hourly.icon);
			}
		);
		
	}
	
	function error() {
		location.innerHTML = "Unable to retrieve your location";
	}
	
	location.innerHTML = "Locating...";
	

}

weather(s);


// watchPosition
