function(doc) {
	if(doc.recurring[1] === "Recurring"){
	emit(doc.recurring[1], {
		"title": doc.title,
		"date": doc.date,
		"keys": doc.keys,
		"meaning": doc.meaning,
		"id": doc._id
	});
	}
};