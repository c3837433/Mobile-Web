//ANGELA SMITH
//VISUAL FRAMEWORKS 1308
//PROJECT 4

//Code that makes sure that none of the JavaScript will run until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

//getElementById function
    function $(x) {
    	var theElement = document.getElementById(x);
	    return theElement;
    }

//Variable Defaults
	var trailRatings = ["Physical Difficulty", "An easy ride", "Challenging", "Technically awesome", "Extreme"];
	var terrainRatings = ["Terrain Conditions", "Paved", "Stable", "Varied", "Unpredictable"];
	var waterValue = "No";
	var restroomValue = "No";
	var errorMessage = $('errors');

// Ger range value
	function getRangeValue(currentValue) {
		var formTag = document.getElementsByTagName("form");
		var current = $('current');
		var distance = $('distance');
		distance.setAttribute("onchange", "getRangeValue(this.value)");
		var now = distance.value;
		current.innerHTML = now;
	}

// Create select field element and populate with options.
    function getTrailRating() {
    	var formTag = document.getElementsByTagName("form");
    	var selectLi = $('selectOptions');
    	var makeSelect = document.createElement('select'); // creates the element
    	makeSelect.setAttribute("id", "physicalSelect"); // setting the id to groups
    	for (var i=0, j=trailRatings.length; i<j; i++) {  //looping through the group
    	    var makeOption = document.createElement('option'); // create an option for each of the strings in the array
    	    var optText = trailRatings[i];	// the text that we want in the option tag, with the index for whichever loop we are in. It will grab the value, and save it.
    	    makeOption.setAttribute("value", optText); // setting the value equal to whatever the text is in the index.
    	    makeOption.innerHTML = optText; // take the text and put it somewhere
    	    makeSelect.appendChild(makeOption); // attach the information to the document
    	    var selVal = makeSelect.options[makeSelect.selectedIndex].text;
    		if (selVal === "Physical Difficulty") {
    		makeSelect.options[makeSelect.selectedIndex].setAttribute('id', "leadOption");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("selected", "selected");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("disabled", "disabled");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("value", "Unknown");
    		}
    	}
    	selectLi.appendChild(makeSelect);	 // now take all the information and attch it to the page.
    	makeSelect.style.display = "block";
    }

    function getTerrainRating() {
    	var formTag = document.getElementsByTagName("form");
    	var selectLi = $('selectOptions');
    	var makeSelect = document.createElement('select'); // creates the element
    	makeSelect.setAttribute("id", "terrainSelect"); // setting the id to groups
    	for (var i=0, j=terrainRatings.length; i<j; i++) {  //looping through the group
    	    var makeOption = document.createElement('option'); // create an option for each of the strings in the array
    	    var optText = terrainRatings[i];	// the text that we want in the option tag, with the index for whichever loop we are in. It will grab the value, and save it.
    	    makeOption.setAttribute("value", optText); // setting the value equal to whatever the text is in the index.
    	    makeOption.innerHTML = optText; // take the text and put it somewhere
    	    makeSelect.appendChild(makeOption); // attach the information to the document
    	    var selVal = makeSelect.options[makeSelect.selectedIndex].text;
    	    if (selVal === "Terrain Conditions") {
    		makeSelect.options[makeSelect.selectedIndex].setAttribute('id', "leadOption");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("selected", "selected");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("disabled", "disabled");
    		makeSelect.options[makeSelect.selectedIndex].setAttribute("value", "Unknown");
    		}
    	}
    selectLi.appendChild(makeSelect);	 // now take all the information and attch it to the page.
    }

 	function getWaterValue() {
 		if($("checkbox1").checked) {
 			waterValue = $("checkbox1").value;
 		} else {
 			waterValue = "No";
 		}
 	}

	function getRestroomValue() {
 		if($("checkbox2").checked) {
 			restroomValue = $("checkbox2").value;
 		} else {
 			restroomValue = "No";
 		}
 	} 

 	function toggleControl(n) {
 		switch(n) {
 			case "on":
 				$('trailForm').style.display = "none";
 				$('clear').style.display = "inline";
 				$('display').style.display = "none";
 				$('addTrail').style.display = "inline";
 				break;
 			case "off":
 			 	$('trailForm').style.display = "block";
 				$('clear').style.display = "inline";
 				$('display').style.display = "inline";
 				$('addTrail').style.display = "none";
 				$('items').style.display = "none";
 				break;
 			default:
 				return false;
 		}
 	}	

	function getData() {
		toggleControl("on");
		if(localStorage.length === 0) {
			alert("There are no trails saved so default data has been added.");
			autoFillData();
		}
		//Here is where we write the data in local storage to the browser
		var createDiv = document.createElement('div');
		createDiv.setAttribute("id", "items");
		var makeUl = document.createElement('ul');
		makeUl.setAttribute("class", "ulStyle");
		createDiv.appendChild(makeUl);
		document.body.appendChild(createDiv);
		$('items').style.display = "block";
		for (var i=0, l=localStorage.length; i<l; i++) {
			var makeLi = document.createElement('li');
			var linkLi = document.createElement('li');
			makeUl.appendChild(makeLi);
			makeLi.setAttribute("class", "liStyle");
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var trailObject = JSON.parse(value); //turning string back into an object(.parse)
			var makeSubUl = document.createElement('ul');
			makeLi.appendChild(makeSubUl);
			// Get the image to the screen
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

	}
	function getGroupImgs(phyCatName, terCatname, makeSubUl) {
		var imageDiv = document.createElement('div');
		imageDiv.setAttribute("class", "imgDiv");
		makeSubUl.appendChild(imageDiv);
		// Create and add the physical image to page.
		var newPhyImg = document.createElement('img');
		newPhyImg.setAttribute("class", "groupImg");
		if (phyCatName === "An easy ride") {
			var setSrc = newPhyImg.setAttribute('id', "one");
		}
		if (phyCatName === "Challenging") {
			var setSrc = newPhyImg.setAttribute('id', "two");
		}
		if (phyCatName === "Technically awesome") {
			var setSrc = newPhyImg.setAttribute('id', "three");
		}
		if (phyCatName === "Extreme") {
			var setSrc = newPhyImg.setAttribute('id', "four");
		}
		if (phyCatName === "Unknown") {
			var setSrc = newPhyImg.setAttribute('id', "five");
		}
		imageDiv.appendChild(newPhyImg);

		//Create and add the terrain image tot he page
		var newTerImg = document.createElement('img');
		newTerImg.setAttribute("class", "groupImg");
		if (terCatname === "Paved") {
			var setSrc = newTerImg.setAttribute('id', "six");
		}
		if (terCatname === "Stable") {
			var setSrc = newTerImg.setAttribute('id', "seven");
		}
		if (terCatname === "Varied") {
			var setSrc = newTerImg.setAttribute('id', "eight");
		}
		if (terCatname === "Unpredictable") {
			var setSrc = newTerImg.setAttribute('id', "nine");
		}
		if (terCatname === "Unknown") {
			var setSrc = newTerImg.setAttribute('id', "five");
		}	
		imageDiv.appendChild(newTerImg);

	}

	//Auto populates test data when local storage is empty.
	function autoFillData() {
		// Data comes from json.js linked through the additem.html
		for (var n in json) {
			var id 	= Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	// this will create an edit and delete storage item when list is displayed.
	function makeItemLink(key, linkLi) {
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		editLink.setAttribute("class", "changeStyle");
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
		deleteLink.setAttribute("class", "changeStyle");
		var deleteText = "Delete trail";
		deleteLink.addEventListener("click", deleteTrail);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);
	}

	function editTrail() {
		// Get the data from local storage
		var value = localStorage.getItem(this.key);
		var ride = JSON.parse(value); // of the key

		// show the form
		toggleControl("off");

		//populate the form fields with the current local storage values
		$('trailName').value = ride.trailName[1];
		$('date').value = ride.date[1];
		$('distance').value = ride.miles[1];
		$('current').innerHTML = ride.miles[1];
		if (ride.restroom[1] == "Yes") {
			$('checkbox1').setAttribute("checked", "checked");
		}
		if (ride.water[1] == "Yes") {
			$('checkbox2').setAttribute("checked", "checked");
		}
		$('physicalSelect').value = ride.physical[1];
		$('terrainSelect').value = ride.terrain[1];
		$('notes').value = ride.notes[1];

		//Need to remove listener from input save contact button (we dont' want to save a new trail)	
		save.removeEventListener("click", saveData);
		//Change submit button value to edit button.
		$('submit').value = "Edit trail";
		var editSubmit = $('submit');
		editSubmit.addEventListener("click", validate);
		// save the key value so we can use it later
		editSubmit.key = this.key;		
	}

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

		
	function validate (ed) {
		var getTrailName = $('trailName');
		var getTrailNameValue = $('trailName').value;
		var getDate = $('date');
		var getDateValue = $('date').value;

		// Reset Error messages
		errorMessage.innerHTML = "";
		getTrailName.style.border = "1px solid grey";
		getDate.style.border = "1px solid grey";


		// get error messages
		var messageArray = [];
		
		if (getTrailNameValue === "") {
			var trailNameError = "Please enter a trail name";
			getTrailName.style.border = "1px solid #E44424";
			messageArray.push(trailNameError);
		}
		if (getDateValue === "") {
			var dateError = "Please select a date.";
			getDate.style.border = "1px solid #E44424";
			messageArray.push(dateError);
		} 
		// If there are errors, display on screen.
		if (messageArray.length >= 1) {
			for (var i = 0, j = messageArray.length; i < j; i++) {
				var text = document.createElement('li');
				text.innerHTML = messageArray[i];
				errorMessage.appendChild(text);
			}
		ed.preventDefault();
		return false;
		} else {
			// If all is ok, save our data and send the key value from the editTrail function
			// passed through the editSubmit listener
			saveData(this.key);
		} 

	}

    function saveData(key) { // generate a unique id whenever we begin a new variable
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
		getTrailRating ();
		getTerrainRating();

		var ride 				= {};
			ride.trailName		= ["Name of Trail: ", $('trailName').value];
			ride.date			= ["Date of ride: ", $('date').value];
			ride.miles			= ["Miles ridden: ", $('distance').value];
			ride.water			= ["Water available: ", waterValue];
			ride.restroom		= ["Restroom available: ", restroomValue];
			ride.physical 		= ["Physical Conditions: ", $('physicalSelect').value];
			ride.terrain 		= ["Terrain Conditions: ", $('terrainSelect').value];
			ride.notes			= ["Trail notes: ", $('notes').value];
	//save Data into local storage: Use stringify to convert our object to a string
	localStorage.setItem(id, JSON.stringify(ride));
	alert("Trail saved!");	
	}	

	function clearData() {
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
	}

	//call functions
	getTrailRating ();
	getTerrainRating ();

	//Set up Link & Submit Click events
	var rangeValue = $('distance');
	rangeValue.addEventListener("change", getRangeValue);
	var displayLink = $('display');
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearData);
	var save = $('submit');
	save.addEventListener("click", validate);
	
});