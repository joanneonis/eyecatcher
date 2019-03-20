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
function getData(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		collectedData[collection] = docData.data();
	});
}


function initApp() {
	getData('words','story');

	console.log(collectedData);

	test();
}

function test() {
	db.collection("words").doc("story")
    .onSnapshot((doc) => {
      process(doc.data().blob);
    });
}


function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);
	tfidf.finish(0);
  tfidf.sortByScore();
	
	tfidf.docFreq(text);

	var allKeys = tfidf.getKeys();
	const result = allKeys.filter(word => (allStupid.indexOf(word) === -1));
	console.log(result);	
}
