// ANGELA SMITH
// Advanced Scalable Data Infrastructures 1311
// Week 1

var parseAddDreamForm = function(data) {
    //console.log(data);
};
// Begin Home page functions
$('#home').on('pageinit', function(){
    //code needed for home page
    console.log(localStorage);
	// Begin Toggle function to view data
	$('#toggleView').on('click', function() {
		$('#dreams').toggle();
		if ($('dreams').is(':visible')) {
			$('#toggleView').next('a').find('span.ui-btn-text').html('Close Dreams');
		} else {
			$('#toggleView').next('a').find('span.ui-btn-text').html('View Dreams');
		}
	}); // End toggle function

	//$("#dreams").empty();
	//Create an UL and add it to the page to hold all the data
	/* var listUl = $("<ul>").appendTo("#dreams");
	 	listUl.attr({
	  	"data-role": "listview",
	  	"data-filter": "true",
	  	"id": "dreamList"
	})*/
	var listUl = $('#dreamList');
	//Loop through local storage items 
	for (var i=0, l=localStorage.length; i<l; i++) {		
	//Get the data out of local storage
		var key = localStorage.key(i);
        var value = localStorage.getItem(key);
		var dream = JSON.parse(value); 
         //turning string back into an object(.parse)
		//console.log(dream);    

		// Make a line item to hold it
		var dreamDetailList = $("<li></li>"); //create a li to hold each dream
		var dreamDetails = $( //Create the information as I want it displayed
			"<h3>" + dream.title[1] + "</h3>" +
			"<p>"+dream.date[1]+"</p>" +
			"<p>"+dream.keys[1]+"</p>" +
			"<p>"+dream.recurr[1]+"</p>" +
			"<p>"+dream.meaning[1]+"</p>" +
			'<a href="#" id="edit" data-key="' + key + ' ">Edit</a>' +" " + 
			'<a href="#" id="delete" data-key="' + key + ' ">Delete</a>'
			);
			
		//dreamDetails.wrap("<li>");  
	 	dreamDetailList.appendTo(listUl);
	 	dreamDetailList.html(dreamDetails);
	 	//console.log(dreamDetails);
	 	
	 	//$('#edit').on('click', editItem(key);
	}; // End for loop through local storage
	
	$("#dreamList").listview('refresh');
	
	//Delete single Dream function	
	 $('#delete').on('click', function(e){
	 	e.preventDefault();
        confirm("Are you sure you want to delete this dream?");
        //var id = $(this).data('key'); //This gets the correct id, but doesn't remove them.
        //console.log(id); //Gives last data-key
        //localStorage.removeItem(id);
        localStorage.removeItem(key); // If lines 66-68 are commented out this line only removes the last item in local storage.
        console.log(localStorage);
        $("#dreamList").listview('refresh');
            
    }); // End Delete single item 
	
	// Empty Local Storage Function
	$('#empty').on('click', function(e){
		e.preventDefault();
		var confirmAnswer = confirm("Are you sure you want to delete ALL stored dreams? This cannot be undone!");
		if (localStorage.length === 0) {
			alert("There are no dreams to clear.");
		} else if (confirmAnswer) {
			localStorage.clear();
			alert("All dreams are deleted.");
			window.location.reload();
			return false;
		} else {
			alert("Dreams have been saved.");
		}
	});// End Empty on click
}); // End Home Page Functions    

$('#addDream').on('pageinit', function(){
	//code needed for addDream page
	var valDream = $('#addDreamForm');
	valDream.validate({ 
		//My appempt to fix the placement of the error so it displays below field (not working)
		errorPlacement: function (error, element) {
        error.insertAfter(element);
    	},
		submitHandler: function(){
			var data = valDream.serializeArray(); //.serialize() parses data into html .serializeArray parses it into an object
			storeDream(data);
		}
	}); 
	
});

    
//Function to save the dream to local storage
var storeDream = function(data){
    //Determine if their is a key from a former saved dream, if not create one.
    if ($('#dreamId').val() == "") {
        var id    = +new Date;
    } else {
        id = $('#dreamId').val();
    }
    //Get all the values and store them into an object array
    var dream        =    {};
    dream.title      =    ["Title: ", $('#title').val()];
    dream.date       =    ["Date: ", $('#date').val()];
    dream.keys       =    ["Keys: ", $('#keys').val()];
    dream.recurr     =    ["Recurring: ", $('#recurring').val()];
    dream.meaning    =    ["Interpretation: ", $('#meaning').val()];
    
    //Take these values and save them to a local storage string.
    localStorage.setItem(id, JSON.stringify(dream));
    //console.log(dream);
    alert("Dream saved");
    window.location.reload();
};
/*
//Edit single item 
var editItem =  function(dream){
	//e.preventDefault();
	var key = $(this).data('id');
	$('#addDream').append(key);
	console.log(key); // This line shows the key is coming through
	var value = localStorage.getItem(this);
	console.log(value);
	var dream = JSON.parse(value); // of the key
	console.log(dream)
	$.mobile.changePage($('#addDream'), 'pop'); 
	
	//populate the form fields with the values from local storage
	$('#title').val(dream.title[1]);
	$('#date').val(dream.date[1]);
	$('#keys').val(dream.keys[1]);
	$('#recurring').val(dream.recurr[1]);
	$('#meaning').val(dream.meaning[1]);
		
}; // End Edit single item

*/