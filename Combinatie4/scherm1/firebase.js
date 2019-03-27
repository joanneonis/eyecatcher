
require([
	'@firebase/app',
	'@firebase/firestore'
], function (firebase) {
	firebase.initializeApp(config);
	db = firebase.firestore();
	initialized = true;
	initApp();

});

let collectedData = [0, 0];
let collectedDataOne;
let collectedDataTwo;
let got = [0, 0];

function getData2(collection, doc, i) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();

		if (i === 0) {
			if (got[i] === 0) {
				collectedDataOne = [...data[got[i]]];
			} else {
				collectedDataOne = [...collectedDataOne, ...data[got[i]]];
			}
			console.log(got[i], collectedDataOne);
			got[i]++;
		}
		if (i === 1) {
			if (got[i] === 0) {
				collectedDataTwo = [...data[got[i]]];
			} else {
				collectedDataTwo = [...collectedDataTwo, ...data[got[i]]];
			}
			console.log(got[i], collectedDataTwo);
			got[i]++;
		}
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
	getData2('demo3','speechInput', 0);
	getData2('demo1','speechInput', 1);

	getState('appSettings','state');
}