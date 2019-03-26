const config = {
	apiKey: "AIzaSyC3qbfSRHAfK67NO90qPVANXPkcPo2bhsk",
	authDomain: "wordcatcher-48198.firebaseapp.com",
	databaseURL: "https://wordcatcher-48198.firebaseio.com",
	projectId: "wordcatcher-48198",
	storageBucket: "wordcatcher-48198.appspot.com",
	messagingSenderId: "929902011942"
};

let db;
let firebase;
let initialized = false;

requirejs.config({
	paths: {
		'@firebase/app': 'https://www.gstatic.com/firebasejs/5.8.4/firebase-app',
		'@firebase/firestore': 'https://www.gstatic.com/firebasejs/5.8.4/firebase-firestore',
	}
});

require([
	'@firebase/app',
	'@firebase/firestore'
], function (firebase) {
	firebase.initializeApp(config);
	db = firebase.firestore();
	initialized = true;
	initApp();

	cleanData();
});

function cleanData() {
	setData('words', 'recognition', [{stream: null, calculatedText: null}]);
}

function setData(collection, doc, data) {
	db
	.collection(collection)
	.doc(doc)
	.set(...data)
		.then(function () {
			// console.log("Document successfully written!");
		}).catch((error) => {
			console.log('oh nee!', error);
		});
}

function updateData(collection, doc, data) {
	db
	.collection(collection)
	.doc(doc)
	.update(...data)
		.then(function () {
			// console.log("Document successfully written!");
		}).catch((error) => {
			console.log('oh nee!', error);
		});
}

let collectedData = [];
let changed = 0;

let superbutifularray = [];

function getData(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		// collectedData[collection] = docData.data();

		let data = docData.data();
		// console.log(data, Object.keys(data).length);

		// Object.keys(data).forEach(function(key,index) {
		// 	// key: the name of the object key
		// 	// index: the ordinal position of the key within the object 
		// 	console.log(key, index);
		// });

		// console.log();

		//? push last (thus new) array with collected words
		// collectedData.push(data[Object.keys(data)[Object.keys(data).length - 1]]);
		// console.log(collectedData, changed);

		superbutifularray = [...superbutifularray, ...process(data[Object.keys(data)[Object.keys(data).length - 1]].join())]
		console.log("this", superbutifularray);
		collectedData = data;
		changed ++;
	});
}


function initApp() {
	getData('demo2','speechInput');
}

// // testverhaal to analyse
// function test() {
// 	db.collection("words").doc("story")
//     .onSnapshot((doc) => {
//       console.log(doc.data().blob);
//     });
// }

function sortByLength (array) {
	return array.sort((y,x) => x.length - y.length);
}

function process(text) {
	// let textToProcess = text;
	// if (typeof text === Array) {
	// 	textToProcess = text.join();
	// }
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
