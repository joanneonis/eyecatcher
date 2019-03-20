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
	getData('words', 'recognition');
});


let collectedData;

function getData(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		run(docData.data());
	});
}

function run(data) {
	console.log(data);
}
