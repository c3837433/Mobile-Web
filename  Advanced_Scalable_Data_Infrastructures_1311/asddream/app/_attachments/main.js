// ANGELA SMITH
// Advanced Scalable Data Infrastructures 1311
// Week 4


// Begin Home page functions
$('#home').on('pageinit', function(){
    //code needed for home page
    console.log("Home Page Loaded");
});  // end home pageinit

//code needed for addDream page
$('#addDream').on('pageinit', function(){
	var valDream = $('#addDreamForm');
    valDream.validate({ // begin validating form
	    errorPlacement: function (error, element) {
	        error.insertAfter(element);
	    },
	    submitHandler: function(){ // Once form passes validation store the values into an object
	        var doc = {
				type: "dream",
				title: ["Title: ", $('#title').val()],
				date: ["Date: ", $('#date').val()],
				keys: ["Keys: ", $('#keys').val()],
				recurring: ["Recurring: ", $('#recurring').val()],
				meaning: ["Meaning: ", $('#meaning').val()]
			}; // end doc object
			$.couch.db("inmydreams").saveDoc(doc, { // Save the document into couch
			    success: function(data) {
			        console.log(data);
			        alert("Dream was saved!");
			        window.location.reload(true); // reload page to precent caching
			    },
			    error: function(status) {
			        console.log(status);
			    }
			}); // Call function to store data
	    }// end submit handler
    }); //End validate       
}); // End addDream pageinit


// make a list of each map available in couch and load it on the HOME page
$(document).on('pageinit', '#getDreams', function(){
// when the getDream page loads, us the couch plugin to to into the mydreams database
// and get the dreams view
	$.couch.db("inmydreams").view("app/dream", {
    	success: function(data) { // create a success function that will get any data
    		console.log(data);
    		console.log("View Dreams Page Loaded");
    		$.each(data.rows, function(i, dream){
			/*// loop over each row and grab the values
				//console.log(value);
				var dreamLine = $("<li href='dreams.html'></li>");
				dreamLine.html('<a href="dreams.html"><p>' + dream.value.title[1] + '</p></a>');
	            dreamLine.appendTo("#dreamList");
			*/
			$("#dreamList").append(
				$('<li>').append(
					$('<a>')
						.attr("href", "dreams.html?dream=" + dream.value.code)
						.text(dream.value.title)	
				) // end anchor append
			); // end li append							
			}); // End loop
		$("#dreamList").listview('refresh'); //refresh the list	
		} // end success
    }); // end couch plugin
}); // end getDreams pageinit

var linkVariables = function (urlData) {
	// split the url
	var linkParts = urlData.split('?');
	var linkPairs = linkParts[1].split('&');
	// separate the key and values
	var values = {};
	for (var pair in linkPairs){
		var keyValue = linkPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		values[key] = value; 
	}
		//console.log(values);
		return(values); // return code/id
};

// When user clicks on a list from a map, populate the list with items, and create a link to a detailed view
$(document).on('pageinit', '#dreams', function(){
	var urlData = $(this).data('url'); // get this url 
	var dreamType = linkVariables(urlData)['dream']; // send the url to the LinkVariables function to get the code
	//console.log(dreamType);
	$.couch.db("inmydreams").view("app/"+dreamType, { //call the list with the matching map
    	success: function(data) { // create a success function that will get these dreams
        //console.log(data);
        $.each(data.rows, function(i, dream){ 
        //console.log(dream.value.id); 
        	// loop over each row and grab the values
        	//console.log(value);
        	$("#dynaDreams").append(
				$('<li>').append(
					$('<a>')
						.attr("href", "details.html?dream=" + dream.value.id)
						.text(dream.value.title[1])	
				) // end anchor append
			); // end li append	                                                     
        }); // End loop
        $("#dynaDreams").listview('refresh'); //refresh the list        
        } // end success
    }); // end couch
	
}); // end dreams pageinit

$(document).on('pageinit', '#details', function(){
	var urlData = $(this).data('url'); // get this url 
	var dreamId = linkVariables(urlData)['dream']; // send the url to the LinkVariables function to get this id
	console.log(dreamId);
	$.couch.db("inmydreams").openDoc(dreamId, {
	    success: function(data) {
	        console.log(data);
	        // populate the page with data
	        var dreamLine = $("<li></li>"); // create a line for each dream detail
	        	dreamLine.html('<h3>'+ data.title[0] + data.title[1] + '</h3>' + 
	        	'<p>'  + data.date[0] + data.date[1] +'</p>' +
	            '<p>'  + data.keys[0] + data.keys[1] + '</p>' +
	            '<p>'  + "This is a " + data.recurring[1] + " dream."+'</p>' +
	            '<p>'  + data.meaning[0] + data.meaning[1] + '</p>');
	            dreamLine.appendTo("#dynaDetail"); // Add the item to the page 
	            $('#deleteDream').on('click', function(){ // call delete fucntion
                    deleteDream(data);
                }) // end deleteDream click 
            	$('#editDream').on('click', function(){ // call edit function
                    editDream(data);
                }); // end deleteDream click 
				
	    }, // end success
	    error: function(status) {
	        console.log(status); // console if couch is unable to save doc
	    } // end error
	}); // end couch	
}); // end details pageinit

var deleteDream = function(data){
	var confDel = confirm("Are you sure you want to delete dream?");
	if (confDel){
		var id = data._id;
		var rev = data._rev;
        //console.log(id);
	    //console.log(rev);
        var doc = { // create a variable of this items id and revision number
	    	_id: id,
	       	_rev: rev
        };
		$.couch.db("inmydreams").removeDoc(doc, { // pass the numbers to couch to delete them
			success: function(data) {
		    	console.log(data);
		        alert("Dream was deleted.");
				$.mobile.changePage("index.html"); // switch back to the main page
		    }, // end success
			error: function(status) {
				console.log(status);
		    } // end error
		}); // end couch deleteDoc	
	} else {
			alert("Dream was not deleted.");
	}
};
// Function to populate edit form with values from that document
var editDream = function(data){
console.log(data);
	$.mobile.changePage($('#editDreamPage'), 'pop'); // When edit is clicked, switch to the edit form page
	 //populate the form fields with the values from the database document
	$('#editDreamRev').val(data._rev);
	$('#editDreamId').val(data._id);
	$('#editTitle').val(data.title[1]);
	$('#editDate').val(data.date[1]);
	$('#editKeys').val(data.keys[1]);
	$('#editRecurring').val(data.recurring[1]);
	$('#editMeaning').val(data.meaning[1]); 
	console.log(data._id); // 
};

/*
// Function to save new values back to couch
$('#editSubmit').on('click', function(){
	var doc = { // save all the values into an object
		_id:  $('#editDreamId').val(), // get the id and revision number to prevent duplication
		_rev:  $('#editDreamRev').val(),
		type: "dream",
		title: ["Title: ", $('#editTitle').val()],
		date: ["Date: ", $('#editDate').val()],
		keys: ["Keys: ", $('#editKeys').val()],
		recurring: ["Recurring: ", $('#editRecurring').val()],
		meaning: ["Meaning: ", $('#editMeaning').val()]
	};
	$.couch.db("inmydreams").saveDoc(doc, { // save the object in the same document on couch
	    success: function(data) {
	        console.log(data);
	        alert("Dream has been edited!");
	    },
	    error: function(status) {
	        console.log(status);
	    } // End error function
	}); // end save doc function
}); // end function called when the editSubmit is clicked
*/
//code needed for addDream page
$('#editDreamPage').on('pageinit', function(){
	var valDream = $('#editDreamForm');
    valDream.validate({ // begin validating form
	    errorPlacement: function (error, element) {
	        error.insertAfter(element);
	    }, // end error placement
	    submitHandler: function(){ // Once form passes validation store the values into an object
			var doc = { // save all the values into an object
				_id:  $('#editDreamId').val(), // get the id and revision number to prevent duplication
				_rev:  $('#editDreamRev').val(),
				type: "dream",
				title: ["Title: ", $('#editTitle').val()],
				date: ["Date: ", $('#editDate').val()],
				keys: ["Keys: ", $('#editKeys').val()],
				recurring: ["Recurring: ", $('#editRecurring').val()],
				meaning: ["Meaning: ", $('#editMeaning').val()]
			}; // end doc object
			$.couch.db("inmydreams").saveDoc(doc, { // save the object in the same document on couch
			    success: function(data) {
			        console.log(data);
			        alert("Dream has been edited!");
			        window.location.reload(true);
			    }, // end success resave
			    error: function(status) {
			        console.log(status);
			    } // End error function
			}); // end save doc function
			$.mobile.changePage($('#getDreams'), 'pop');
	    }// end submit handler
    }); //End validate       
}); // End editDream pageinit
