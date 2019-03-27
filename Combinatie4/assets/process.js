function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);
	tfidf.finish(0);
  tfidf.sortByScore();
	
	// tfidf.docFreq(text);

	var allKeys = tfidf.getKeys();
	const filteredResult = allKeys.filter(word => (allStupid.indexOf(word) === -1));
	const result = sortByLength(filteredResult); // .slice(0, 3)
	
	return result;
}

function sortByLength (array) {
	return array.sort((y,x) => x.length - y.length);
}
