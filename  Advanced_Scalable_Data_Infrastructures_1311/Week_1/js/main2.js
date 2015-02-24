 //Edit single item 
$('#edit').on('click', function(e){
                e.preventDefault();
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
                
}); // End Edit single item
        
//Delete single Dream function
$('#delete').on('click', function(e){
	e.preventDefault();
    confirm("Are you sure you want to delete this dream?");
    var key = $(this).data('id');
    console.log(key);
    localStorage.removeItem(this.key);
    console.log(key);
    //listUl.listview('refresh');
                
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
    
