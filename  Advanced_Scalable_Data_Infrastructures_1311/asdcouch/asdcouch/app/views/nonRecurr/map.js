function(doc) {
	if(doc.recurring[1] === "No"){
	emit(doc.recurring[1].substring(0,2)+doc.recurring[0].substring(0,9), {
		"title": doc.title,
		"date": doc.date,
		"keys": doc.keys,
		"meaning": doc.meaning
	});
	}
};