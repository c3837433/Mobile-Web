// ANGELA SMITH
// Advanced Scalable Data Infrastructures 1311
// Week 4


// Begin Home page functions
$('#home').on('pageinit', function(){
    //code needed for home page
    console.log("Home Page Loaded");
});  // end home pageinit


// make a list of each map available in couch and load it on the HOME page
$(document).on('pageinit', '#getDreams', function(){
// when the getDream page loads, us the couch plugin to to into the mydreams database
// and get the dreams view
	$.couch.db("asdmydreams").view("mydreams/dream", {
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
	$.couch.db("asdmydreams").view("mydreams/"+dreamType, { //call the list with the matching map
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
	$.couch.db("asdmydreams").openDoc(dreamId, {
	    success: function(data) {
	        console.log(data);
	        // populate the page with data
	        var dreamLine = $("<li></li>");
	        	dreamLine.html('<h3>'+ data.title[0] + data.title[1] + '</h3>' + 
	        	'<p>'  + data.date[0] + data.date[1] +'</p>' +
	            '<p>'  + data.keys[0] + data.keys[1] + '</p>' +
	            '<p>'  + "This is a " + data.recurring[1] + " dream."+'</p>' +
	            '<p>'  + data.meaning[0] + data.meaning[1] + '</p>');
	            dreamLine.appendTo("#dynaDetail"); // Add the line to the list 
	            $('#deleteDream').on('click', function(){
                    deleteDream(data);
                }) // end deleteDream click 
            	$('#editDream').on('click', function(){
                    editDream(data);
                }); // end deleteDream click 
				
	    }, // end success
	    error: function(status) {
	        console.log(status);
	    } // end error
	}); // end couch	
}); // end details pageinit

var deleteDream = function(data){
	confirm("Are you sure you want to delete dream?");
	var id = data._id;
	            var rev = data._rev;
	            console.log(id);
	            console.log(rev);
	            var doc = {
	            	_id: id,
	            	_rev: rev
	            		            };
					$.couch.db("asdmydreams").removeDoc(doc, {
					     success: function(data) {
					         console.log(data);
					         alert("Dream was deleted.");
					         $.mobile.changePage("index.html");
					    },
					    error: function(status) {
					        console.log(status);
					    }
					}); // end couch deleteDoc	
};

var editDream = function(data){
console.log(data);
	$.mobile.changePage($('#editDreamPage '), 'pop'); 
				    //populate the form fields with the values from local storage
				    $('#editDreamRev').val(data._rev);
				    $('#editDreamId').val(data._id);
				    $('#editTitle').val(data.title[1]);
				    $('#editDate').val(data.date[1]);
				    $('#editKeys').val(data.keys[1]);
				    $('#editRecurring').val(data.recurring[1]);
				    $('#editMeaning').val(data.meaning[1]); 
				    console.log(data._id);

};

// saving a new document
$('#submit').on('click', function(){
	var doc = {
		type: "dream",
		title: ["Title: ", $('#title').val()],
		date: ["Date: ", $('#date').val()],
		keys: ["Keys: ", $('#keys').val()],
		recurring: ["Recurring: ", $('#recurring').val()],
		meaning: ["Meaning: ", $('#meaning').val()]
	};
	$.couch.db("asdmydreams").saveDoc(doc, {
	    success: function(data) {
	        console.log(data);
	        alert("Dream was saved!");
	    },
	    error: function(status) {
	        console.log(status);
	    }
	});
});
// editing a document
$('#editSubmit').on('click', function(){
	var doc = {
		_id:  $('#editDreamId').val(),
		_rev:  $('#editDreamRev').val(),
		type: "dream",
		title: ["Title: ", $('#editTitle').val()],
		date: ["Date: ", $('#editDate').val()],
		keys: ["Keys: ", $('#editKeys').val()],
		recurring: ["Recurring: ", $('#editRecurring').val()],
		meaning: ["Meaning: ", $('#editMeaning').val()]
	};
	$.couch.db("asdmydreams").saveDoc(doc, {
	    success: function(data) {
	        console.log(data);
	        alert("Dream has been edited!");
	    },
	    error: function(status) {
	        console.log(status);
	    }
	});
});

