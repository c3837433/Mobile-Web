function(doc) {
	if(doc.type === "dream"){
	emit(doc.type, { // first argument = key, second argument (json object) = value
		"title": doc.title,
		"date": doc.date,
		"keys": doc.keys,
		"recurring": doc.recurring,
		"meaning": doc.meaning,
		"id": doc._id
	});
	}
};