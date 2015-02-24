// ANGELA SMITH
// Advanced Scalable Data Infrastructures 1311
// Week 2

var parseAddDreamForm = function(data) {
    //console.log(data);
};
// Begin Home page functions

$('#home').on('pageinit', function(){
    //code needed for home page
    //console.log(localStorage);
});  // end home pageinit


$('#getDreams').on('pageinit', function(){
    //code needed for getDreams page
    //console.log(localStorage);
    $("#dreamList").empty(); // Empty formatting data
});  // end getDreams pageinit

//code needed for addDream page
$('#addDream').on('pageinit', function(){

        var valDream = $('#addDreamForm');
        valDream.validate({ 
                //My appempt to fix the placement of the error so it displays below field (not working)
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
         $("#dreamList").empty(); // Clearin the current list
    $.getJSON('xhr/data.json', function(data) { // Pulling the data
            //var dream = JSON.parse(data);
            //console.log(dream);
                $.each(data, function(i, value){ // for each object, build a li
                        var dreamLine = $("<li id='listL'></li>");
                        dreamLine.html('<h3>'+ value.title + '</h3>' + 
                        '<p>'  + value.date + '</p>' +
                        '<p>'   + value.keys + '</p>' +
                        '<p>'   + value.recurring + '<p/>' +
                        '<p>'  + value.meaning + '</p>');
                        dreamLine.appendTo("#dreamList"); // Add the line to the list
           }); // End each loop
           $("#dreamList").listview('refresh'); //refresh the list
        }).error(function(error) {
                 console.log(error);
        }); // end getDreams
        
         
});// end on click
/*      
$('#json').on( 'click', getJson = function() {
        console.log("Getting JSON Data");
        $("#dreamList").empty();
        $.ajax({ // core method
                url: 'xhr/data.json', //String of local or remote relative path based on HTMP
                type: 'GET', //HTTP method, in string
                dataType: 'jsonp', // data for the server to process (xml, html, text, json, script, jsonp)
                success: function(response){ // callback function with response data argument(receive json object as responce)
                                console.log(responce);
                },
                error: function(error){ 
                console.log(error);
                }
                
        });
});// end get JSON function
*/
/* Sample JSON object
     {
        "title": "California",
        "date": "2013-08-01",
        "keys": "Surfing",
        "recurring": "No",
        "meaning": "not sure"
    }
 */ 

$('#xml').on( 'click', function() {
        console.log("Getting XML Data");
    $("#dreamList").empty();
    $.get('xhr/data.xml', function(data){ // get the file and pass in the argument to represent data
            $(data).find('dream').each(function(){ // loop through each dream
                var title = $(this).find('title').text();
                var date = $(this).find('date').text();
                var keys = $(this).find('keys').text();
                var recurring = $(this).find('recurring').text();
                var meaning = $(this).find('meaning').text();
                var dreamLine = $("<li id='listL'></li>");
                        dreamLine.html('<h3>'+ title + '</h3>' + 
                                '<p>'  + date + '</p>' +
                                '<p>'         + keys + '</p>' +
                                '<p>'         + recurring + '</p>' +
                                '<p>'         + meaning + '</p>');
                                dreamLine.appendTo("#dreamList");
                                
                }); // end grab all data and display it to the page
                $("#dreamList").listview('refresh');
        /* sample xml object
     <dream>
        <title>Two</title>
        <date>2013-10-15</date>
        <keys>Butterflies</keys>
        <recurring>No</recurring>
        <meaning>Not sure</meaning>
    </dream>
         * */
        }); // end get data
        $("#dreamList").listview('refresh');
});// end get XML function

$('#locStor').on('click', function(){
        //console.log(localStorage);
        $("#dreamList").empty(); //Prevents the list from duplicating
        for (var i=0, l=localStorage.length; i<l; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var dream = JSON.parse(value); //turn string back into an object
                console.log(key);
                console.log(value);
                console.log(dream);
                var dreamDetailList = $("<li id='" + key + "' class='indDream'></li>"); //create a li to hold each dream
                var dreamDetails = $( //Create the information as I want it displayed
                        "<h3>" + dream.title[1] + "</h3>" +
                        "<p>" + dream.date[1] + "</p>" +
                        "<p>" + dream.keys[1] + "</p>" +
                        "<p>" + dream.recurr[1] + "</p>" +
                        "<p>" + dream.meaning[1] + "</p>" 
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
                        console.log(key);
                        localStorage.removeItem(key);
                        console.log(localStorage);
                        $("#dreamList").listview('refresh');
                });
                $('.indDream').on('click', '#edit', function(e){
                        e.preventDefault();
                        var key = $(this).data('key');
                        editDream(key);
                         
                });
                
        }; // End loop through local storage
        $("#dreamList").listview('refresh'); 

});// End load from local storage
// Function to editDream
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
        $('#recurring').val(dream.recurr[1]);
        $('#meaning').val(dream.meaning[1]);
       
};


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