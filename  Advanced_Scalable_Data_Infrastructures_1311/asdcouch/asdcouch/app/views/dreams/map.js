function(doc) {
	if(doc.type === "dream"){
	emit(doc.type, {
		"title": doc.title,
		"date": doc.date,
		"keys": doc.keys,
		"recurring": doc.recurring,
		"meaning": doc.meaning
	});
	}
};