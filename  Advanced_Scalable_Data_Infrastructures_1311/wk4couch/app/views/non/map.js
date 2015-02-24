function(doc) {
	if(doc.recurring[1] === "Nonrecurring"){
	emit(doc.recurring[1], {
		"title": doc.title,
		"date": doc.date,
		"keys": doc.keys,
		"meaning": doc.meaning,
		"id": doc._id
	});
	}
};