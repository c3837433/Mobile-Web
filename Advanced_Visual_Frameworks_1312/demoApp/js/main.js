// Advanced Visual Frameworks 1312
// Angela Smith
// Week 3

//Function to call when the weather API is clicked
var runWeather = function () {
    console.log("Weather API Page Loaded");
    $('#reset').closest('.ui-btn').hide();
}; // end runWeather

// Toggle between links shown on weather page
var toggleView = function () {
    $('#lookup').show();
    $('#reset').closest('.ui-btn').hide();
    $('#resultsWea').empty();
}; // End reset toggle function

// Display Weather API Data from either the Name field or Geolocation
var displayData = function (results) {
    //Empty the Listview;
    $('#resultsWea').empty();
	// set the variable state to either the state or country
    var state;
    var hour;
    if(results.location.state === ""){
    	state = results.location.country_name;
    } else {
    	state = results.location.state;
    }
    var observ = results.current_observation;
    var forecast = results.forecast.simpleforecast.forecastday[0];
    // Get the non military hour
    if (results.sun_phase.sunset.hour > 12) {
    	hour = results.sun_phase.sunset.hour - 12;
    }
    // Create a title message
    var message = "<h4>Current conditions for " + results.location.city + ", " +
    results.location.country + "</h4>";
    // Prepend message to the top of content
    $('#resultsWea').prepend(message);
    var pic; // create a vairable to hold dynamic picture
    var thisObj = { // create object to hold selected weather info
    all: [{
          desc: "Current Temperature: " + observ.temp_f +
          "&degF (" + observ.temp_c + "&degC)",
          asideTop: "High: " + forecast.high.fahrenheit + "&degF (" + forecast.high.celsius + "&degC)",
          asideBot: "Low: " + forecast.low.fahrenheit + "&degF (" + forecast.low.celsius + "&degC)",
          id: "temp"
          }, {
          desc: "Conditions: " + observ.weather,
          asideTop: "Humidity: " + observ.relative_humidity,
          asideBot: "Pressure: " + observ.pressure_in,
          id: "clouds"
          }, 
          {
          desc: "Wind is traveling from the " + observ.wind_dir + " at " + observ.wind_mph + " mph",
          asideTop:  "Gusting to " + observ.wind_gust_mph + " mph",
          asideBot: "Feels like " + observ.feelslike_f + "&degF",
          id: "wind"
          },
          {
          desc: "Skies are " + forecast.icon + " and " + forecast.skyicon,
          asideTop:  "Sunrise " + results.sun_phase.sunrise.hour + ":" + results.sun_phase.sunrise.minute + "AM",
          asideBot: "Sunset " + hour + ":" + results.sun_phase.sunset.minute + "PM",
          id: "sun"
          }]
    }; // end thisObj object
    console.log(thisObj);
    $.each(thisObj.all, function (i, value) { // loop through the selected info
           console.log(thisObj.all);
           // determine which picture to use
           var pic;
           if (value.id === "temp") { 
           pic = "temp.png";
           } else if (value.id === "clouds") {
           pic = "weather.png";
           } else if (value.id === "wind") {
           pic = "wind.png";
           } else if (value.id === "sun") {
           pic = "sun.png";
           }; // end conditional
           console.log(value);
           if (value.asideBot === undefined) {
           value.asideBot = "";
           }
           var list = "<li><img src='../www/img/" + pic + "'/><h2>" +
           value.desc + "</h2><p class='ui-li-aside'>" + value.asideTop +
           "<br>" + value.asideBot + "</p></li>";
           // create the line item and add it to the listview
           $('#resultsWea').append(list);
           });
    $('#location').val("");
    $('#resultsWea').listview('refresh'); //refresh the listview
}; // end display weather data function

// Function to get API data from Geolocation
var getDetails = function () {
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var location = $('#location').val();
    // Separate the string
    var loc = location.split(',');
    var weaApi = "http://api.wunderground.com/api/3d402f1818f340e0/geolookup/conditions/forecast/almanac/astronomy/q/" + loc[1] + "/" + loc[0] + ".json";
    $.ajax({
           "url": weaApi,
           "dataType": "jsonp",
           "success": function (data) {
           console.log(data);
           displayData(data);
           } // end success
           }); // end ajax call
    return false;
}; // end get details function

// Function to get and display Geolocation coordinates
var findLoc = function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Latitude=" + lat + " Longitude=" + lon);
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var weaApi = "http://api.wunderground.com/api/3d402f1818f340e0/geolookup/q/" + lat + "," + lon + ".json";
    $.ajax({
           "url": weaApi,
           "dataType": "jsonp",
           "success": function (data) {
           console.log(data);
           displayData(data);
           } // end success
           }); // end ajax call
    return false;
}; // end findLoc function

//Function to call when the Instagram API is clicked
var runInstagram = function () {
    console.log("Instagram API Page Loaded");
    $('#resultsInst').empty();
}; // end runInstagram

// Function to display Instagram Data
var displayImages = function (results) {
    //Empty the Listview
    $('#resultsInst').empty();
    console.log(results);
    // Sample HTML
    //<img src="url" alt="user_fullname"/><h2>username</h2><p>caption<p/><p>filter</p>
    $.each(results.data, function (index, value) {
           var loc;
           if (value.location !== null) { // if the location is not empty
           console.log(value.location);
           if (value.location.name !== null) { // and if the name is not empty use it
           console.log(value.location.name);
           loc = value.location.name;
           }
           } else { // otherwise skip it
           loc = "";
           }
           if (loc === undefined) { // if the location is still undefined (had geo without a name) set to blank
           loc = " ";
           }
           var image = "<li><h2>" + value.user.username +
           "</h2><h3 class='ui-li-aside'>Likes &hearts; " +
           value.likes.count + "<h3><img src='" + value.images.standard_resolution
           .url + "' id='inst' alt='" + value.user.full_name + "'/><p>" +
           loc + "</p><p>" + value.tags + "</p></li>";
           $('#resultsInst').append(image);
           }); // end loop through retrieved results
}; // end displayImages function

// Function to get Instagram API Data
var getImages = function () {
    // get the value from the search field
    var tag = $('#tag').val();
    console.log(tag);
    // Instagram API Endpoints link for recent popular images.
    //https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID.
    //https://api.instagram.com/v1/tags/snow/media/recent?access_token=ACCESS-TOKEN
    //Replace client with my data. Without callback=?&amp; will not receive results
    var api = "https://api.instagram.com/v1/tags/" + tag +
    "/media/recent?callback=?&amp;client_id=bf7a180389d34095a78d6f44b6660f73";
    $.getJSON(api, displayImages);
    return false; // stop page from changing
};

// function to get current Geolocation Coordinates
var getCoordinates = function (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    $('#locPoints').html("<p>Latitude: " + lat + "<br> Longitude: " + long + "</p>");
};// end function to get coordinates

// Call the Geolocation Method when clicked on Weather Page
var runLoc = function () {
    navigator.geolocation.getCurrentPosition(findLoc);
};

// Call the Geolocation Method when clicked on Geolocation Page
var runGeo = function () {
    navigator.geolocation.getCurrentPosition(getCoordinates);
}; // end get device api

// Function to get the directional coordinates
var getDirection = function (currHeading) {
	// Take the heading and pass it to the h2 tag
	$('#getDir').html(currHeading.magneticHeading);
};// end get compass coordinates

// Set the time interval to check heading
var compOption =  {
	frequency: 2000
}; // end set compass to 2 seconds

// Call the Compass Method when clicked on Compass Page
var runCompass = function () {
    navigator.compass.watchHeading(getDirection, compOption);
}; // end get device api

//Research Functions
// Get the link code from the research link for detailed research page
var getCode = function (url) {
	console.log(url);
	// split the url
	var splitLink = url.split('?');
	// Get the key and value pairs
	var keVaPairs = splitLink[1].split('&');
	// separate keys and values
	var values = {};
	for (var pair in keVaPairs){
		var keyValue = keVaPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		values[key] = value; 
		console.log(values)
	}
		//console.log(values);
		return(values); // return code/id
};

var displayDetail = function (data, code) {
	console.log(data);
	console.log(code);
	var item;
	if (code === "one") {
		item = data.research[0];	
	} else if (code === "two") {
		item = data.research[1];
	} else if (code === "thr") {
		item = data.research[2];
	}; // end code conditional
	console.log(item);
};

var displayResDetail = function () {
	console.log('research Detail Page Loaded');
	var urlData = $(this).data('url'); // get this url
	console.log(urlData); 
	var dreamId = getCode(urlData)['research']; // send the link to get what comes after "research"
	console.log(dreamId);
	var couchApi = "https://angessmith:sakleijj@angessmith.cloudant.com/inmydreams/f57b65aceebe92236e88dce2c50e47e9";
    $.ajax({
           "url": couchApi,
           "dataType": "jsonp",
           "success": function (data) {
           		console.log(data);
           		displayDetail(data, dreamId);
           } // end success
    }); // end ajax call
    return false;
};

// Display the research options on the research page dynamically
var displayResearch = function (data) {
	$.each(data.research, function (i, reVal){
			console.log(reVal);
		$("#dynaList").append(
				$('<section></section')
					.attr("data-role", "collapsible")
					.html(
						$('<h4>' + reVal.title + '<h4>' + 
						'<h5>' + reVal.a[0] + '</h5><p>'+ reVal.a[1]+ '</p>' + 
						'<h5>' + reVal.b[0] + '</h5><p>'+ reVal.b[1]+ '</p>' +
						'<h5>' + reVal.c[0] + '</h5><p>'+ reVal.c[1]+ '</p>' +
						'<h5>' + reVal.d[0] + '</h5><p>'+ reVal.d[1]+ '</p>' +
						'<h5>' + reVal.e[0] + '</h5><p>'+ reVal.e[1]+ '</p>'
						) // end section add
				) // end html
			); // end collapsible append	
	});// end loop through research
	$('#dynaList').collapsibleset('refresh'); //refresh the set
}; // end display research data



var loadDynRes =  function(){
// When research page loads, get data from database
	var couchApi = "https://angessmith:sakleijj@angessmith.cloudant.com/inmydreams/f57b65aceebe92236e88dce2c50e47e9";
    $.ajax({
           "url": couchApi,
           "dataType": "jsonp",
           "success": function (data) {
           		console.log(data);
           		displayResearch(data);
           } // end success
    }); // end ajax call
    return false;
}; // end research pageinit

// Functions to wait for when device is ready
var whenReady = function () {
    $("#weather").on("pageinit", runWeather);
    $("#instagram").on("pageinit", runInstagram);
    $("#research").on("pageinit", loadDynRes);
    $("#resDet").on("pageinit", displayResDetail);
    $('#getImages').on('click', getImages);
    $('#getWeath').on('click', getDetails);
    $('#reset').on('click', toggleView);
    $('#getGeo').on('click', runGeo);
    $('#getLocation').on('click', runLoc);
    $('#getDir').on('click', runCompass);
}; // end phonegap whenReady


//Listen for when the device is ready, and call functions when clicked
document.addEventListener("deviceready", whenReady, false);