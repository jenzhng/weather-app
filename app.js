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
//var fahrenheit;
var fahrenheitArr = [];
var $icons = $(".icon");
var currentIcon;

//var $day = $(".day");


function startSkycons(currentIcon){
	//"https://rawgithub.com/darkskyapp/skycons/master/skycons.js"
	
	var icon = currentIcon;
	var skycons = new Skycons({"color": "black"});
		/*skycons.set("icon", Skycons.RAIN);
		skycons.set("icon", Skycons.CLEAR_DAY);
		skycons.set("icon", Skycons.CLEAR_NIGHT);
		skycons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
		skycons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
		skycons.set("icon", Skycons.CLOUDY);
		skycons.set("icon", Skycons.SLEET);
		skycons.set("icon", Skycons.SNOW);
		skycons.set("icon", Skycons.WIND);
		skycons.set("icon", Skycons.FOG);
	*/
	switch (icon) {
		case "CLEAR_DAY":
			skycons.add(document.getElementById("icon"), Skycons.CLEAR_DAY);
			break;
		case "CLEAR_NIGHT":
			skycons.add(document.getElementById("icon"), Skycons.CLEAR_NIGHT);
			break;
		case "PARTLY_CLOUDY_DAY":
			skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
			break;
		case "PARTLY_CLOUDY_NIGHT":
			skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_NIGHT);
			break;
		case "CLOUDY":
			skycons.add(document.getElementById("icon"), Skycons.CLOUDY);
			break;
		case "RAIN":
			skycons.add(document.getElementById("icon"), Skycons.RAIN);
			break;
		case "SNOW":
			skycons.add(document.getElementById("icon"), Skycons.SNOW);
			break;
		case "FOG":
			skycons.add(document.getElementById("icon"), Skycons.FOG);
			break;
		case "SLEET":
			skycons.add(document.getElementById("icon"), Skycons.SLEET);
			break;
		case "WIND":
			skycons.add(document.getElementById("icon"), Skycons.WIND);
			break;
			
		default:
		
	}
/*
	$icons.each(function() {
      this.width = 128;
      this.height = 128;
    })
	*/
	skycons.play();
}


function TimeConverter(UNIX_timestamp) {
  var date = new Date(UNIX_timestamp * 1000);
  var week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var weekShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  this.day = week[date.getDay()];
  this.dayNum = date.getDate();
  this.dayShort = weekShort[date.getDay()];
}

function getIcon(icon, iconID) {
  /*var weather = ["clear-day","clear-night","rain","snow","sleet","wind","fog","cloudy","partly-cloudy-day","partly-cloudy-night"]; */
  var currentIcon = icon.replace(/-/g, '_').toUpperCase();
  
  console.log(currentIcon);
  startSkycons(currentIcon);
  
  //return skycons.set(iconID, Skycons[currentIcon]);
}

function storeTemp(fahrenheit) {
  var tempf = Math.round(fahrenheit);
  fahrenheitArr.push(tempf);
}


function weather() {
	var code = document.getElementById("apikey").value;
	var zip = document.getElementById("zipcode").value;
	var url = "https://api.darksky.net/forecast/";
	var latitude;
	var longitude;
	var $day = $(".day");
	var UNIX_timestamp;
	var $temp = $(".temp");


	$.getJSON("https://raw.githubusercontent.com/jkeefe/better-weather-alexa/master/data/zips.json", function(data) {
		$.each(data, function(key, val) {
			if (key == zip) {
				latitude = val.lat;
				longitude = val.lon;

				console.log(latitude);
				console.log(longitude);
				$.getJSON(
					url + code + "/" + latitude + "," + longitude + "?callback=?",
					function(data) {
						//$("#temperature").html(data.currently.temperature + "° F");
						//$("#minutely").html(data.minutely.summary);
						//$("#hourly").html(data.hourly.icon);
						console.log($day.length);

						//var time = new TimeConverter(data.currently.time);
						//$day.first().html(time.day + " " + time.dayNum);
						
						
						
						for (i = 0; i < $day.length; i++) {
						// date
							console.log(data.daily.data[i].time);
							var time = new TimeConverter(data.daily.data[i].time);
							$($day[i]).html(time.dayShort + " " + time.dayNum);
						//	var icon
						// temp
							getIcon(data.daily.data[i].icon, $icons[i]);
							//var iconpicture = data.daily.data[i].icon;
							//console.log(iconpicture);
							fahrenheit = data.daily.data[i].temperatureMax;
							storeTemp(fahrenheit);
							$($temp[i]).html(fahrenheitArr[i] + " °F");						    

						}
					}
				);
			}
			
		});
	}
	);

	

}


startSkycons(currentIcon);
TimeConverter(UNIX_timestamp);
//getIcon(icon);
getIcon(icon, iconID);
storeTemp(fahrenheit);


weather();


// watchPosition
