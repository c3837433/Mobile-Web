// ANGELA SMITH
// Advanced Scalable Data Infrastructures 1311
// Week 3

var parseAddDreamForm = function(data) {
    //console.log(data);
};



// Begin Home page functions

$('#home').on('pageinit', function(){
    //code needed for home page
    console.log("Home Page Loaded");
});  // end home pageinit


$('#getDreams').on('pageinit', function(){
    //code needed for getDreams page
    console.log("View Dreams Page Loaded");
    $('#couchSort').hide(); // hide the couch sorting
    $("#dreamList").empty(); // Empty formatting data
});  // end getDreams pageinit

//code needed for addDream page
$('#addDream').on('pageinit', function(){
	var valDream = $('#addDreamForm');
    valDream.validate({ 
	    errorPlacement: function (error, element) {
	        error.insertAfter(element);
	    },
	    submitHandler: function(){
	    	var data = valDream.serializeArray(); //.serialize() parses data into html .serializeArray parses it into an object
	        storeDream(data); // Call function to store data
	    }
    }); //End validate        
}); // End addDream pageinit

        
        
// Empty Local Storage Function
$('.dataChange').on('click', '#delete', function(e){
	e.preventDefault();
    var confirmAnswer = confirm("Are you sure you want to delete ALL stored dreams? This cannot be undone!");
    if (localStorage.length === 0) {
    	alert("There are no dreams to clear.");
    } else if (confirmAnswer) {
        localStorage.clear();
        alert("All dreams are deleted.");
    	$("#dreamList").listview('refresh'); //refresh the list
    } else {
        alert("Dreams have been saved.");
    };        
    window.location.reload();
});// End Empty on click

//Loading with ajax:
// An HTTP method for the request (GET or POST)
// URL to a server-side resource (relative path usually)
// Attach any data to the request (for the server to process)
// Specify a CALLBACK FUNCTION 

$("#json").on('click', function(){
    console.log("Getting JSON Data");
    $('#couchSort').hide(); // hide the couch sorting
    $("#dreamList").empty(); // Clearin the current list
    $.getJSON('data.json', function(data) { // Pulling the data
    	//var dream = JSON.parse(data);
    	console.log(data);
        $.each(data.dreams, function(i, value){ // i = index, value = object (for each object in the array)
        	var dreamLine = $("<li id='listL'></li>");
           	dreamLine.html('<h3>'+ value.title[0] + value.title[1] + '</h3>' + 
            	'<p>'  + value.date[0] + value.date[1] +'</p>' +
                '<p>'  + value.keys[0] + value.keys[1] + '</p>' +
                '<p>'  + value.recurring[0] + value.recurring[1] + '<p/>' +
                '<p>'  + value.meaning[0] + value.meaning[1] + '</p>');
            dreamLine.appendTo("#dreamList"); // Add the line to the list
        }); // End each loop
        $("#dreamList").listview('refresh'); //refresh the list
        }).error(function(error) {
        	console.log(error);
        }); // end error
});// end on click

$('#xml').on( 'click', function() {
	$('#couchSort').hide(); // hide the couch sorting
    console.log("Getting XML Data");
    $("#dreamList").empty();
    $.get('data.xml', function(data){ // get the file and pass in the argument to represent data
    	$(data).find('dream').each(function(){ // loop through each dream
	        var title = $(this).find('title').text();
            var date = $(this).find('date').text();
            var keys = $(this).find('keys').text();
            var recurring = $(this).find('recurring').text();
            var meaning = $(this).find('meaning').text();
            var dreamLine = $("<li id='listL'></li>");
            dreamLine.html('<h3>'+ title + '</h3>' + 
            	'<p>'  + date + '</p>' +
                '<p>'  + keys + '</p>' +
                '<p>'  + recurring + '</p>' +
                '<p>'  + meaning + '</p>');
            dreamLine.appendTo("#dreamList");                    
        }); // end grab all data and display it to the page
        $("#dreamList").listview('refresh');
	}); // end get data
    $("#dreamList").listview('refresh');
});// end get XML function

$('#database').on('click', function(){
	$("#dreamList").empty(); // Clearing the current list
	$('#couchSort').show(); // show the couch sorting
	$('#viewAll').prop("checked", true).checkboxradio("refresh");
	getAllCouch();
}); // end on database click

$('#viewAll').on('click', function(){
	$(this).prop("checked", true).checkboxradio("refresh");
	getAllCouch();
});

var getAllCouch = function(){
	$("#dreamList").empty(); // Clearing the current list
	$.ajax({
		"url":"_view/dreams",
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			$.each(data.rows, function(i, dream){
			// loop over each row and grab the values
				//console.log(value);
				var dreamLine = $("<li id='listL'></li>");
				dreamLine.html('<h3>'+ dream.value.title[0] + dream.value.title[1] + '</h3>' + 
            	'<p>'  + dream.value.date[0] + dream.value.date[1] +'</p>' +
                '<p>'  + dream.value.keys[0] + dream.value.keys[1] + '</p>' +
                '<p>'  + dream.value.recurring[0] + dream.value.recurring[1] + '</p>' +
                '<p>'  + dream.value.meaning[0] + dream.value.meaning[1] + '</p>');
            dreamLine.appendTo("#dreamList"); // Add the line to the list							
			}); // End loop
		$("#dreamList").listview('refresh'); //refresh the list	
		} // end success
	}); // end ajax
	$('#nonRec').prop("checked", false).checkboxradio("refresh");
	$('#recurr').prop("checked", false).checkboxradio("refresh");
}; // end getAllCouch

$('#recurr').on('click', function(){
	$("#dreamList").empty(); // Clearing the current list
	$(this).prop("checked", true).checkboxradio("refresh");
	$('#nonRec').prop("checked", false).checkboxradio("refresh");
	$('#viewAll').prop("checked", false).checkboxradio("refresh");
	$.ajax({
		"url":"_view/recurring",
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			$.each(data.rows, function(i, dream){
			// loop over each row and grab the values
				//console.log(value);
				var dreamLine = $("<li id='listL'></li>");
				dreamLine.html('<h3>'+ dream.value.title[0] + dream.value.title[1] + '</h3>' + 
            	'<p>'  + dream.value.date[0] + dream.value.date[1] +'</p>' +
                '<p>'  + dream.value.keys[0] + dream.value.keys[1] + '</p>' +
                '<p>'  + dream.value.meaning[0] + dream.value.meaning[1] + '</p>');
            dreamLine.appendTo("#dreamList"); // Add the line to the list							
			}); // End loop
		$("#dreamList").listview('refresh'); //refresh the list	
		} // end success
	}); // end ajax
}); //end recurr click

$('#nonRec').on('click', function(){
	$("#dreamList").empty(); // Clearing the current list
	$(this).prop("checked", true).checkboxradio("refresh");
	$('#recurr').prop("checked", false).checkboxradio("refresh");
	$('#viewAll').prop("checked", false).checkboxradio("refresh");
	$.ajax({
		"url":"_view/nonRecurr",
		"dataType": "json",
		"success": function(data) {
			//console.log(data);
			$.each(data.rows, function(i, dream){
			// loop over each row and grab the values
				//console.log(value);
				var dreamLine = $("<li id='listL'></li>");
				dreamLine.html('<h3>'+ dream.value.title[0] + dream.value.title[1] + '</h3>' + 
            	'<p>'  + dream.value.date[0] + dream.value.date[1] +'</p>' +
                '<p>'  + dream.value.keys[0] + dream.value.keys[1] + '</p>' +
                '<p>'  + dream.value.meaning[0] + dream.value.meaning[1] + '</p>');
            dreamLine.appendTo("#dreamList"); // Add the line to the list							
			}); // End loop
		$("#dreamList").listview('refresh'); //refresh the list	
		} // end success
	}); // end ajax
}); //end nonRecurr click

$('#locStor').on('click', function(){
	$('#couchSort').hide(); // hide the couch sorting
	if(localStorage.length === 0) {
		alert("There are no dreams saved so default data has been added.");
		pullJson(); // call function to put json into local storage
	}
	loadLocal();// load local storage       
});// End load from local storage
// Function to editDream

var loadLocal = function(){
	 $("#dreamList").empty(); //Prevents the list from duplicating
        for (var i=0, l=localStorage.length; i<l; i++) {
        	var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            console.log(value);
            var dream = JSON.parse(value); //turn string back into an object
            //console.log(key);
            //console.log(value);
            //console.log(dream);
            var dreamDetailList = $("<li id='" + key + "' class='indDream'></li>"); //create a li to hold each dream
            var dreamDetails = $( //Create the information as I want it displayed
 	            "<h3>" + dream.title[0] +" "+ dream.title[1] + "</h3>" +
                "<p>" + dream.date[0] +" "+ dream.date[1] + "</p>" +
                "<p>" + dream.keys[0] +" "+ dream.keys[1] + "</p>" +
                "<p>" + dream.recurring[0] +" "+ dream.recurring[1] + "</p>" +
                "<p>" + dream.meaning[0] +" "+ dream.meaning[1] + "</p>" 
                );
            var editLink = $('<a href="#" id="edit" data-key="'+ key +'">Edit</a>');
            var deleteLink = $('<a href="#" id="delete" data-key="'+ key +'">Delete</a>');
            deleteLink.attr('data-icon', 'delete');// Change icon to delete
            dreamDetailList.html(dreamDetails);
            dreamDetailList.append(editLink).appendTo("#dreamList");
            dreamDetailList.append(deleteLink).appendTo("#dreamList");
            $('.indDream').on('click', '#delete', function(e){
            	e.preventDefault();
                //console.log(localStorage);
                var key = $(this).data('key');
                //console.log(key);
                deleteDream(key);
            });
            $('.indDream').on('click', '#edit', function(e){
            	e.preventDefault();
                var key = $(this).data('key');
                editDream(key);                         
             });                
		}; // End loop through local storage
        $("#dreamList").listview('refresh'); 
};

var deleteDream = function(key) {
	localStorage.removeItem(key);
    //console.log(localStorage);
    loadLocal();	
};
var editDream = function(key){
	console.log(key);
    var value = localStorage.getItem(key);
    //console.log(value);
    var dream = JSON.parse(value); // of the key
    //console.log(dream)
    $.mobile.changePage($('#addDream'), 'pop'); 
    //populate the form fields with the values from local storage
    $('#dreamId').val(key);
    $('#title').val(dream.title[1]);
    $('#date').val(dream.date[1]);
    $('#keys').val(dream.keys[1]);
    $('#recurring').val(dream.recurring[1]);
    $('#meaning').val(dream.meaning[1]);   
};
var pullJson = function(){
    console.log("Loading JSON Data to local storage");
    $("#dreamList").empty(); // Clearing the current list
    $.getJSON('data.json', function(data) { // Pulling the data
    	//console.log(data);  // gets dreams object
    	//console.log(data.dreams); // gets each object	
    	$.each(data.dreams, function(i, value){ // i = index, value = object (for each object in the array)
            // loop over each dream
            var id 	= Math.floor(Math.random()*100000001); // New Date is to fast within the loop
            var indDream = JSON.stringify(data.dreams[i]);
            //console.log(indDream);
            console.log("LocaStorage has " + localStorage.length + " items.");
            localStorage.setItem(id,indDream);
        	//localStorage.setItem(id, JSON.stringify(data.dreams[i]));
        }); // End each loop 
        loadLocal(); //Populates list with new data from local storage	 
    }); // end getDreams
};

//Function to save the dream to local storage
var storeDream = function(data){
    //Determine if their is a key from a former saved dream, if not create one.
    if ($('#dreamId').val() === "") {
        var id    = +new Date();
    } else {
        id = $('#dreamId').val();        
    }
    //Get all the values and store them into an object array
    var dream        =    {};
    dream.title      =    ["Title: ", $('#title').val()];
    dream.date       =    ["Date: ", $('#date').val()];
    dream.keys       =    ["Keys: ", $('#keys').val()];
    dream.recurring     =    ["Recurring: ", $('#recurring').val()];
    dream.meaning    =    ["Interpretation: ", $('#meaning').val()];
    
    //Take these values and save them to a local storage string.
    localStorage.setItem(id, JSON.stringify(dream));
    //console.log(dream);
    alert("Dream saved");
    window.location.reload();
};