// Advanced Visual Frameworks 1312
// Angela Smith
// Week 4

// NOTIFICATION
var endAlert = function () {
    console.log("Notification has ended");
};
var runNotify = function () {
    navigator.notification.alert(
                                 "Notifications are working.",   // alert message
                                 endAlert,                       // end alert
                                 "Notification Demo",            // notification title
                                 "Return to App"                 // End button name
                                 );
};
// Alert for NO network connection
var noConnect = function (pageCall) {
    navigator.notification.alert(
                                 "This page needs a network connection to run.",   // alert message
                                 endAlert,                       // end alert
                                 "No Network Connection",            // notification title
                                 "Return to App"                 // End button name
                                 );
};

//CONNECTION (iOS version)
// When Weather or Instagram page load, check connection. If none, display no connection. If cell, change instagram to smaller images.
var runConnect = function () {
    var connect = navigator.connection.type;
    var type = {};
    type[Connection.UNKNOWN]  = 'unknown';
    type[Connection.ETHERNET] = 'ethernet';
    type[Connection.WIFI]     = 'WiFi';
    type[Connection.CELL]     = 'cellular';
    type[Connection.NONE]     = 'no';
    console.log("Device has " + type[connect] + " connection." );
    // return the type of connection back to the function
    return type[connect];
};
// Check device connection
var checkConn = function () {
    // check the connection type
    var type = runConnect();
    //console.log(type);
    // return the connection
    return type;
};
var getConnection = function () {
	// get the connection type
	var type = runConnect();
	// pass the type into the field
	$('#connType').val(type);
};

// WEATHER
//Function to call when the weather API page is first loaded
var runWeather = function () {
    console.log("Weather API Page Loaded");
    $('#reset').closest('.ui-btn').hide();
    // set the info for the alert if page has no network
    // check the connection type
    /*   var type = runConnect();
     //console.log(type);
     // if there is no connection, alert that data is unavailable.
     if (type === "no") {
     // if there is no connection, alert the user
     noConnect();
     };
     */
}; // end runWeather
// Toggle between links shown on weather page
var toggleView = function () {
    $('#lookup').show();
    $('#reset').closest('.ui-btn').hide();
    $('#resultsWea').empty();
}; // End reset toggle function
// Display Weather API Data from either the Name field or Geolocation
var displayData = function (results) {
    $.mobile.changePage($('#weather'));
    //Empty the Listviews;
    $('#resultsWea').empty();
    $('#weaAlert').empty();
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
    // Check for alerts
    console.log(results.alerts);
    if (results.alerts.length === 0) {
    	console.log("There are no alerts!");
    } else {
    	// create a notification
    	navigator.notification.alert(
                                     results.alerts[0].description,  // alert message
                                     endAlert,                       // end alert
                                     "Weather Alert",            	// notification title
                                     "View Weather Detail"           // End button name
                                     );
    	// create a tag with message
    	var alertMessage = "<li><h4>Weather Alert<br>" + results.alerts[0].description + " in effect untill " + results.alerts[0].expires + ".</h4></li>";
    	// add message to the page
    	$('#weaAlert').prepend(alertMessage);
    }; // end conditional
    // Create a title message
    var message = "<h4>Current conditions for " + results.location.city + ", " +
    results.location.country + "</h4>";
    // Prepend message to the top of content
    $('#resultsWea').prepend(message);
    var pic; // create a variable to hold dynamic picture
    var thisObj = { // create object to hold selected weather info
    all: [{
          desc: ["Currently: ", observ.temp_f +
                 "&degF (" + observ.temp_c + "&degC)"],
          asideTop: "High: " + forecast.high.fahrenheit + "&degF (" + forecast.high.celsius + "&degC)",
          asideBot: "Low: " + forecast.low.fahrenheit + "&degF (" + forecast.low.celsius + "&degC)",
          id: "temp"
          }, {
          desc: [observ.weather + " skies", " "],
          asideTop: "Humidity: " + observ.relative_humidity,
          asideBot: "Pressure: " + observ.pressure_in,
          id: "clouds"
          },
          {
          desc: [observ.wind_dir + " winds", " at " + observ.wind_mph + " mph"],
          asideTop:  "Gusting to " + observ.wind_gust_mph + " mph",
          asideBot: "Feels like " + observ.feelslike_f + "&degF",
          id: "wind"
          },
          {
          desc: ["Today will be ", forecast.icon],
          asideTop:  "Sunrise " + results.sun_phase.sunrise.hour + ":" + results.sun_phase.sunrise.minute + " AM",
          asideBot: "Sunset " + hour + ":" + results.sun_phase.sunset.minute + " PM",
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
           var list = "<li><img src='../www/img/" + pic + "'/><h5>" +
           value.desc[0]+ "<br>" + value.desc[1] + "</h5><p class='ui-li-aside'>" + value.asideTop +
           "<br>" + value.asideBot + "</p></li>";
           // create the line item and add it to the listview
           $('#resultsWea').append(list);
           });
    $('#location').val("");
    $('#resultsWea').listview('refresh'); //refresh the listview
}; // end display weather data function
// Function to get API data from Geolocation
var getDetails = function () {
    // lookup connection
    /*   var conn = checkConn();
     // if there is no connection, set up alert
     if (conn === "no") {
     noConnect();
     } else {
     */        // if there is a connection, run function
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var location = $('#location').val();
    // Separate the string
    var loc = location.split(',');
    var weaApi = "http://api.wunderground.com/api/3d402f1818f340e0/geolookup/conditions/forecast/alerts/almanac/astronomy/q/" + loc[1] + "/" + loc[0] + ".json";
    $.ajax({
           "url": weaApi,
           "dataType": "jsonp",
           "success": function (data) {
           console.log(data);
           displayData(data);
           return false;
           } // end success
           }); // end ajax call
    /*   };// end connection conditional */
}; // end get details function
// Function to get and display Geolocation coordinates
var findLoc = function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Latitude=" + lat + " Longitude=" + lon);
    $('#lookup').hide();
    $('#reset').closest('.ui-btn').show();
    var weaApi = "http://api.wunderground.com/api/3d402f1818f340e0/geolookup/conditions/forecast/alerts/almanac/astronomy/q/" + lat + "," + lon + ".json";
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


// INSTAGRAM
//Function to call when the Instagram pag is first loaded
var runInstagram = function () {
    console.log("Instagram API Page Loaded");
    $('#resultsInst').empty();
    // set the info for the alert if page has no network
    // check the connection type
    var type = runConnect();
    //console.log(type);
    // if there is no connection, alert that data is unavailable.
    if (type === "no") {
        // if there is no connection, alert the user
        noConnect();
    };
}; // end runInstagram
// Function to display Instagram Data
var displayImages = function (results) {
    // check the connection type
    var type = runConnect();
    console.log(type);
    var imageRes;
    // run the function to get data
    //Empty the Listview
    $('#resultsInst').empty();
    //console.log(results);
    // Sample HTML
    //<img src="url" alt="user_fullname"/><h2>username</h2><p>caption<p/><p>filter</p>
    $.each(results.data, function (index, value) {
           var loc;
           if (value.location !== null) { // if the location is not empty
           //console.log(value.location);
           if (value.location.name !== null) { // and if the name is not empty use it
           //console.log(value.location.name);
           loc = value.location.name;
           }
           } else { // otherwise skip it
           loc = "";
           }
           if (loc === undefined) { // if the location is still undefined (had geo without a name) set to blank
           loc = " ";
           }
           // See if device is not on cellular service, if it is load low resolution images
           if (type === "cellular"){
           imageRes = value.images.low_resolution;
           console.log("Pulling low resolution image.");
           } else {
           imageRes = value.images.standard_resolution;
           console.log("Pulling standard resolution image.");
           };
           // run the function to get data
           
           var image = "<li><h2>" + value.user.username +
           "</h2><h3 class='ui-li-aside'>Likes &hearts; " +
           value.likes.count + "<h3><img src='" + imageRes
           .url + "' id='inst' alt='" + value.user.full_name + "'/><p>" +
           loc + "</p><p>" + value.tags + "</p></li>";
           $('#resultsInst').append(image);
           }); // end loop through retrieved results
}; // end displayImages function
// INSTAGRAM API
var getImages = function () {
    var type = runConnect();
    //console.log(type);
    // if there is no connection, alert that data is unavailable.
    if (type === "no") {
        // if there is no connection, alert the user
        noConnect();
    };
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
}; // end getImages and load to the page


// GEOLOCATION
var getCoordinates = function (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(lat);
    console.log(long);
    $('#locPoints').html("<p>Latitude: " + lat + "<br> Longitude: " + long + "</p>");
};// end function to get coordinates

// GEOLOCATION / WEATHER MASHUP
var runLoc = function () {
    // lookup connection
    var conn = checkConn();
    // if there is no connection, set up alert
    if (conn === "no") {
        noConnect();
    } else {
        // if there is a connection, check geolocation for data
        navigator.geolocation.getCurrentPosition(findLoc);
    };
};
// Call the Geolocation Method when clicked on Geolocation Page
var runGeo = function () {
    navigator.geolocation.getCurrentPosition(getCoordinates);
}; // end get device api


// COMPASS
var head = 0;
var getDirection = function (currHeading) {
    // Take the heading and pass it to the h2 tag
    var display = currHeading.magneticHeading;
    $('#headResults').val(display);
};// end get compass coordinates
// Set the time interval to check heading
var compOption =  {
frequency: 2000
}; // end set compass to 2 seconds
var compError = function (error) {
    console.log("Error is: " + error.code);
};
// Call the Compass Method when clicked on Compass Page
var runCompass = function () {
    // set the head to current direction
    head = navigator.compass.watchHeading(getDirection, compError, compOption);
}; // end get device api

var endCompass = function() {
    // if compass is movilg
    if (head) {
        navigator.compass.clearWatch(head);
        head = 0;
        // stop compass and reset it
        console.log("Compass has closed");
    }
};


//  RESEARCH
// Display the research options on the research page dynamically
var displayResearch = function (data) {
    $.each(data.research, function (i, reVal){
           console.log(reVal);
           $("#dynaList").append(
                                 $('<article></article')
                                 .attr("data-role", "collapsible")
                                 .html(
                                       $('<h2>' + reVal.title + '<h2>' +
                                         '<h3>' + reVal.a[0] + '</h3><p>'+ reVal.a[1]+ '</p>' +
                                         '<h3>' + reVal.b[0] + '</h3><p>'+ reVal.b[1]+ '</p>' +
                                         '<h3>' + reVal.c[0] + '</h3><p>'+ reVal.c[1]+ '</p>' +
                                         '<h3>' + reVal.d[0] + '</h3><p>'+ reVal.d[1]+ '</p>' +
                                         '<h3>' + reVal.e[0] + '</h3><p>'+ reVal.e[1]+ '</p>'
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


// CAMERA
var takePhoto = function (imageInfo) {
    console.log("loading Camera");
    var image = $('#shot');
    image.src = "data:image/jpeg;base64," + imageInfo;
};
var openCamera = function () {
    console.log("Camera page loaded.");
    navigator.device.capture.captureImage(takePhoto);
};


// ACCELEROMETER
// Global variabl to moniter the accelerometer movements
var movement = 0;
var endAccel = function () {
    // stop the monitering when "stop" is pressed
    if(movement){
        navigator.accelerometer.clearWatch(movement);
        movement = null;
        console.log("Acceleromoter stopped");
    }
};
// Find the current position and display on page
var startAccel = function (accel) {
    // when the acceleromoter starts, set the variables to the current position
    console.log("x = " + accel.x + " y = " + accel.y + " z = " + accel.z);
    $('#x').val(accel.x);
    $('#y').val(accel.y);
    $('#z').val(accel.z);
};

var accError = function (error) {
    console.log("Error=: " + error.code);
};
var getAccel = function () {
    //Stop timing after 2 seconds
    var time = {frequency: 2000};
    movement = navigator.accelerometer.watchAcceleration(startAccel, accError, time);
};


// CONTACT
var makeContact = function () {
    // Call the navigator function to create a new contact and set to var newContact
    // Get the variables from the input fields
    var fName = $('#fName').val();
    var lName = $('#lName').val();
    var pNum = $('#pNum').val();
    var createContact = navigator.contacts.create();
    // set the names
    createContact.displayName = fName + " " + lName;
    createContact.nickname = fName + " " + lName;
    // Set the contact's first and last names
    var newContact = new ContactName();
    newContact.givenName = fName;
    newContact.familyName = lName;
    // Set th new contact's name to the new variables
    createContact.name = newContact;
    // create an array to hold contactField's phone numbers
    // true specifies which number is preferred
    var pNums = [];
    pNums[0] = new ContactField('mobile', pNum, true);
    // Add the phoneNumber to the contact
    createContact.phoneNumbers = pNums;
    // save the contact to the device's contact list;
    createContact.save();
    var endAlert = function () {
        console.log("Notification has ended");
    };
    navigator.notification.alert(
                                 "Contact has been saved.",   // alert message
                                 endAlert,
                                 "Add Contact",            // notification title
                                 "Return to App"                 // End button name
                                 );
    location.reload();
};

// DEVICE READY

var whenReady = function () {
    console.log('Device is ready');
    // Weather functions
    $("#weather").on("pageinit", runWeather);
    $('#getWeath').on('click', getDetails);
    $('#reset').on('click', toggleView);
    // Instagram
    $("#instagram").on("pageinit", runInstagram);
    $('#getImages').on('click', getImages);
    // Research
    $("#research").on("pageinit", loadDynRes);
    // Geolocation	
    $('#getGeo').on('click', runGeo);
    // Geolocation/ Weather Mashup
    $('#getLocation').on('click', runLoc);
    // Compass
    $('#getDir').on('click', runCompass);
    $('#stopHead').on('click', endCompass);
    // Camera Function
    $('#getPhoto').on('click', openCamera);
    // Accelerometer
    $('#getMovement').on('click', getAccel);
    $('#stopMove').on('click', endAccel);
    // Contacts
    $('#createContact').on('click', makeContact);
    // Notification
    $('#notAlert').on('click', runNotify);
    // Connection
    $('#getConnect').on('click', getConnection);
}; // end phonegap whenReady

//Listen for when the device is ready, and call functions when clicked
document.addEventListener("deviceready", whenReady, false);