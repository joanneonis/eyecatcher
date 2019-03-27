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

let collectedData = [0, 0];
let got = [0, 0];

function getData(collection, doc, i) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();

		if (collectedData[i] != 0) {
			collectedData[i] = [...collectedData[i], ...data[got[i]]];
		} else {
			collectedData[i] = [...data[0]];
		}

		got[i]++;
		console.log(collectedData[i], got[i]);
	});
}

let appState = false;

function getState(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();

		appState = data.running;
	});
}


function initApp() {
	getData('demo2','speechInput', 0);
	getData('demo1','speechInput', 1);

	getState('appSettings','state');
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
	// const result = sortByLength(filteredResult); // .slice(0, 3)
	
	return filteredResult;
}
