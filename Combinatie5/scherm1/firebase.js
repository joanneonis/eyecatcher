
require([
	'@firebase/app',
	'@firebase/firestore'
], function (firebase) {
	firebase.initializeApp(config);
	db = firebase.firestore();
	initialized = true;
	initApp();

});

let pos = [0, 0];

function setScreenSettings(e, i) {
	if (i === 0) { updateData('appSettings', 'screenSettings', [{pos: e}]); }
	if (i === 1) { updateData('appSettings', 'screenSettings', [{pos1: e}]); }
}
function getScreenSettings() {
	db.collection('appSettings').doc('screenSettings').onSnapshot((docData) => {
		let data = docData.data();
		console.log(data);
		pos = [data.pos, data.pos1];

		console.log("get pos", pos);
	});
} 

let collectedData = [0, 0];
let collectedDataOne;
let collectedDataTwo;

function getData2(collection, doc, i) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();

		if (i === 0) {
			if (pos[i] === 0) {
				collectedDataOne = [...data[pos[i]]];
			} else {
				collectedDataOne = [...collectedDataOne, ...data[pos[i]]];
			}
			console.log(pos[i], collectedDataOne);
			pos[i]++;
		}
		if (i === 1) {
			if (pos[i] === 0) {
				collectedDataTwo = [...data[pos[i]]];
			} else {
				collectedDataTwo = [...collectedDataTwo, ...data[pos[i]]];
			}
			console.log(pos[i], collectedDataTwo);
			pos[i]++;
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

	getScreenSettings();
}