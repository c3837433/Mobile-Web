//ANGELA SMITH
//Mobile Interfaces and Usability 1310
//Project 4

var parseAddRideForm = function(data) {
	// use form data here;
	//console.log(data);
}
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addRide').on('pageinit', function(){
	var adTrForm = $("#rideForm"), // Grabs the JQ form
		addTrErrLink = $("#addTrErrLink")
	;
	adTrForm.validate({
		invalidHandler: function(form, validator) {
			addTrErrLink.click();
			//console.log(validator.submitted);
			var html = "";
			for(var key in validator.submitted){
				var label = $('label[for^="' + key + '"]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html +='<li>' + fieldName + '</li>';
			};
			$("#addRideErrors ul" ).html(html);
		},
		submitHandler: function(){
			var data = adTrForm.serializeArray(); //.serialize() parses data into html .serializeArray parses it into an object
			saveData(data);
		}
		
	//any other code needed for addItem page goes here
		
});
$('#clear').on( 'click', function clearData() {
		var confirmAnswer = confirm("Are you sure you want to delete ALL trails? This cannot be undone!");
		if (localStorage.length === 0) {
			alert("There is no data to clear.");
		} else if (confirmAnswer) {
			localStorage.clear();
			alert("All trails are deleted!");
			window.location.reload();
			return false;
		} else {
			alert("Data has been saved.");
		}
});
	
//The functions below can go inside or outside the pageinit function for the page in which it is needed.
	//getElementById function
    var re = function(x) {
    	var theElement = document.getElementById(x);
	    return theElement;
    }
	
	// Get Amenity value functions
	 var getWaterValue = function() {
 		if($("input:checkbox[name=water]:checked").val()) {
 			waterValue = "Yes";
 		} else {
 			waterValue = "No";
 		}
 	}
	var getRestroomValue = function() {
 		if( $("input:checkbox[name=restroom]:checked").val()) {
 			restroomValue = "Yes";
 		} else {
 			restroomValue = "No";
 		}
 	} 


	//Function to storeData
	var saveData = function(data, key) { // generate a unique id whenever we begin a new variable
		// If there is no key, this is a new trail, and a new key will be generated.
		// If a key is available, it will use the key available and save over the data.

		if (!key) {
		var id 					= Math.floor(Math.random()*100000001);
		} else {
			id = key;
		}
		//gather all form field values and store them into an object
		//object properties will contain an array that contains the form label and input values
		getWaterValue();
		getRestroomValue();


		var ride 				= {};
			ride.trailName		= ["Name of Trail: ", $('#trailName').val()];
			ride.date			= ["Date of ride: ", $('#when').val()];
			ride.miles			= ["Miles ridden: ", $('#miles').val()];
			ride.water			= ["Water Available: ", waterValue];
			ride.restroom		= ["Restroom available: ", restroomValue];
			ride.physical 		= ["Physical Conditions: ", $('#physicalGroup').val()];
			ride.terrain 		= ["Terrain Conditions: ", $('#terrainGroup').val()];
			ride.notes			= ["Trail notes: ", $('#notes').val()];
	//save Data into local storage: Use stringify to convert our object to a string
	localStorage.setItem(id, JSON.stringify(ride));
	//console.log(ride);
	alert("Trail saved!");
	
	}
	
	var autoFillData = function (){
		// Data comes from json.js linked through the index.html
		for (var n in json) {
			var id 	= Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}		 
	};

	//Here is where we write the data in local storage to the browser
$('#display').on( 'click', getData = function() {
		
		if(localStorage.length === 0) {
			alert("There are no trails saved so default data has been added.");
			autoFillData();
		}
		//console.log(localStorage);
		
		var list = re('items');
		var makeUl = document.createElement('ul');
		makeUl.setAttribute("data-role", "listview");
		makeUl.setAttribute("id", "ulStyle");
		list.appendChild(makeUl);
		for (var i=0, l=localStorage.length; i<l; i++) {
			var makeLi = document.createElement('li');
			var linkLi = document.createElement('li');
			list.appendChild(makeLi);
			makeLi.setAttribute("id", "liStyle");
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var trailObject = JSON.parse(value); //turning string back into an object(.parse)
			var makeSubUl = document.createElement('ul');
			makeSubUl.setAttribute("id", "dataList");
			makeLi.appendChild(makeSubUl);
			// Get the images to the screen
			getGroupImgs(trailObject.physical[1], trailObject.terrain[1], makeSubUl);
			for (var n in trailObject) {
				var makeSubLi = document.createElement('li');
				makeSubUl.appendChild(makeSubLi);
				var optSubText = trailObject[n][0] + " " + trailObject[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubUl.appendChild(linkLi);
			}
			makeItemLink(localStorage.key(i), linkLi);
			// passes the key into the makeItemList function
		}

});
	
	// Function to add images to the getData function
	function getGroupImgs(phyCatName, terCatname, makeSubUl) {
		var imageDiv = document.createElement('div');
		imageDiv.setAttribute("class", "imgDiv");
		makeSubUl.appendChild(imageDiv);
		// Create and add the physical image to page.
		var newPhyImg = document.createElement('img');
		newPhyImg.setAttribute("class", "groupImg");
		if (phyCatName === "An easy ride.") {
			var setSrc = newPhyImg.setAttribute('id', "one");
		}
		if (phyCatName === "A good challenge.") {
			var setSrc = newPhyImg.setAttribute('id', "two");
		}
		if (phyCatName === "Technically awesome.") {
			var setSrc = newPhyImg.setAttribute('id', "three");
		}
		if (phyCatName === "An extreme ride.") {
			var setSrc = newPhyImg.setAttribute('id', "four");
		}
		if (phyCatName === "Unknown") {
			var setSrc = newPhyImg.setAttribute('id', "five");
		}
		imageDiv.appendChild(newPhyImg);

		//Create and add the terrain image tot he page
		var newTerImg = document.createElement('img');
		newTerImg.setAttribute("class", "groupImg");
		if (terCatname === "Smooth, paved surface.") {
			var setSrc = newTerImg.setAttribute('id', "six");
		}
		if (terCatname === "Hard-packed stable surface.") {
			var setSrc = newTerImg.setAttribute('id', "seven");
		}
		if (terCatname === "Varied terrain.") {
			var setSrc = newTerImg.setAttribute('id', "eight");
		}
		if (terCatname === "Unpredictable terrain.") {
			var setSrc = newTerImg.setAttribute('id', "nine");
		}
		if (terCatname === "Unknown") {
			var setSrc = newTerImg.setAttribute('id', "five");
		}	
		imageDiv.appendChild(newTerImg);

	}	
		
	// Function to create edit and delete links with each displayed stored ride
	function makeItemLink(key, linkLi) {
		var editLink = document.createElement('a');
		editLink.href = "#editRide";
		editLink.key = key;
		// assigns the variable that was passed
		var editText = "Edit trail";
		editLink.addEventListener("click", editTrail);
		editLink.innerHTML = editText;
		linkLi.setAttribute("class", "modLinks");
		linkLi.appendChild(editLink);

		// add a line break 
		var breakTag = document.createElement('br');
		linkLi.appendChild(breakTag);

		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete trail";
		deleteLink.addEventListener("click", deleteTrail);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);
	}
		
	function editTrail() {
		// Get the data from local storage
		var value = localStorage.getItem(this.key);
		var ride = JSON.parse(value); // of the key
		//console.log(ride)
    	$.mobile.changePage($('#addRide'), 'pop'); 

		//populate the form fields with the current local storage values
		$('#trailName').val(ride.trailName[1]);
		$('#when').val(ride.date[1]);
		$('#miles').val(ride.miles[1]);
		if (ride.restroom[1] === "Yes") {
			//console.log("It is available");
          $('#restroom').prop('checked', true).checkboxradio('refresh');
        }
		if (ride.water[1] === "Yes") {
		//	console.log("It is available")
          $('#water').prop('checked', true).checkboxradio('refresh');
        }
		$("#physicalGroup").val(ride.physical[1]).selectmenu('refresh');
		$("#terrainGroup").val(ride.terrain[1]).selectmenu('refresh');
		$('#notes').val(ride.notes[1]);

		//Need to remove listener from input save contact button (we dont' want to save a new trail)	
		//save.removeEventListener("click", saveData);
		//Change submit button value to edit button.
		//re('submit').value = "Edit Trail";
		$('#submit .ui-btn-text').text("Edit Trail");
		$('#submit').button('refresh');
		var editSubmit = $('#submit');
		//editSubmit.addEventListener("click", validate);
		// save the key value so we can use it later
		editSubmit.key = this.key;		
};

	function deleteTrail() {
		var ask = confirm("Are you sure you want to delete this trail?");
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Trail was deleted.");
			window.location.reload();
		} else {
			alert("Trail was not deleted.");
		}
	}	
	
});