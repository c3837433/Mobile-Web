function(doc) {
	if(doc._id.substring(0,5) === "dream"){
	emit(doc._id, { // first argument = key, second argument (json object) = value
		"title": doc.title,
		"code": doc.code
	});
	}
};