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
    state + "</h4>";
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
          asideBot: "Pressure: " + observ.pressure_in + " in",
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

// Function to get and display Geolocation coordinates for weather
var findLoc = function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Latitude=" + lat + " Longitude=" + lon);
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var weaApi = "http://api.wunderground.com/api/3d402f1818f340e0/geolookup/conditions/forecast/almanac/astronomy/q/" + lat + "," + lon + ".json";
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

/*
 // Function to get the directional coordinates
 var onSuccess = function (heading) {
 var head = heading.magneticHeading;
 console.log(head);
 // Take the heading and pass it to the h2 tag
 $('#headResults').html("<h2>The current direction is: " + head + "</h2>");
 };// end get compass coordinates
 
 var compError = function() {
 console.log('CompassError: ' + error.code);
 };
 */
// Call the Compass Method when clicked on Compass Page
var runCompass = function () {
    console.log("loading navigator");
    //navigator.compass.getCurrentHeading(onSuccess, compassError);
}; // end get device api

// Camera Page
var takePhoto = function (imageInfo) {
    console.log("loading Camera");
    var image = $('#shot');
    image.src = "data:image/jpeg;base64," + imageInfo;
};
var openCamera = function () {
    console.log("Camera page loaded.");
    navigator.camera.getPicture(takePhoto);
};

// Compass page
// The watch id references the current `watchHeading`
var watchID = null;
// onSuccess: Get the current heading
//
var onSuccess = function (heading) {
    console.log("Recieving direction");
    console.log(heading);
    // Take the heading and pass it to the h2 tag
    $('#headResults').html("<h2>The current direction is: " + heading + "</h2>");
};// end get compass coordinates

// If compass can't get the heading
var onError = function () {
    console.log('onError!');
};
// Start watching the compass
var startWatch = function () {
    console.log("compass starting");
    // Update compass every 3 seconds
    var options = { frequency: 3000 };
    
    watchID = navigator.compass.watchHeading(onSuccess, onError, options);
};

// Stop watching the compass
//
var stopWatch = function() {
    console.log("compass ending");
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
};



// Functions to wait for when device is ready
var whenReady = function () {
    $("#weather").on("pageinit", runWeather);
    $("#instagram").on("pageinit", runInstagram);
    $('#getImages').on('click', getImages);
    $('#getWeath').on('click', getDetails);
    $('#reset').on('click', toggleView);
    $('#getGeo').on('click', runGeo);
    $('#getLocation').on('click', runLoc);
    //$('#getDir').on('click', runCompass);
    $('#getDir').on('click', startWatch);
    $('#getPhoto').on('click', openCamera);
    $('#stopDir').on('click', stopWatch);
}; // end phonegap whenReady

//Listen for when the device is ready, and call functions when clicked
document.addEventListener("deviceready", whenReady, false);