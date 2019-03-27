
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

		// if (collectedData[i] != 0) {
		// 	collectedData[i] = [...collectedData[i], ...data[got[i]]];
		// } else {
		// 	collectedData[i] = [...data[0]];
		// }

		// got[i]++;
		// console.log(collectedData[i], got[i]);

		if (i === 0) {
			if (collectedDataOne) {
				collectedDataOne = [...collectedDataOne, ...data[got[i]]];
			} else {
				collectedDataOne = [...data[0]];
			}

			got[i]++;
			console.log(collectedDataOne, got[i]);
		} else {
			if (collectedDataTwo) {
				collectedDataTwo = [...collectedDataTwo, ...data[got[i]]];
			} else {
				collectedDataTwo = [...data[0]];
			}

			got[i]++;
			collectedDataOne.reverse();
			collectedDataTwo.reverse();
			console.log("Got new input", collectedDataTwo[got[i]], collectedDataOne[got[i]]);
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