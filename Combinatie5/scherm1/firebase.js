
require([
	'@firebase/app',
	'@firebase/firestore'
], function (firebase) {
	firebase.initializeApp(config);
	db = firebase.firestore();
	initialized = true;
	initApp();

});

let pos = 0;
let appState = false;

let idleMode;
let prevMode;
let resetCount;

let collectedDataOne;

let word = [0, 0];
let count = [0, 0];

function setScreenSettings(e, i) {
	if (i === 0) { updateData('appSettings', 'screenSettings', [{pos: e}]); }
	if (i === 1) { updateData('appSettings', 'screenSettings', [{pos1: e}]); }
}
function getScreenSettings() {
	db.collection('appSettings').doc('screenSettings').onSnapshot((docData) => {
		let data = docData.data();
		pos = data.pos;
	});
} 

function getData2(collection, doc, i) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		if (idleMode) { return; };
		let data = docData.data();

		if (i === 0) {
			if (pos === 0) {
				collectedDataOne = [...data[pos]];
			} else {
				collectedDataOne = [...collectedDataOne, ...data[pos]];
			}
		}
		pos++;
	});
}

function getidlemode() {
	db.collection('appSettings').doc('idle').onSnapshot((docData) => {
		prevMode = idleMode;
		idleMode = docData.data().modus;

		if (prevMode && !idleMode) {
			console.log('replay');
			restart();
		}
	});
}

function restart() {
	word = [0, 0];
	count = [0, 0];
	pos = 0;
	collectedDataOne = [];
	setData('demo3','speechInput', [{}]);

	document.querySelector('#textContent').parentElement.parentElement.parentElement.classList = '';
	document.querySelector('#textContent2').parentElement.parentElement.parentElement.classList = '';
}

function getState(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();

		appState = data.running;
	});
}


function initApp() {
	getidlemode();

	getData2('demo3','speechInput', 0);

	getState('appSettings','state');

	getScreenSettings();

	db.collection('appSettings').doc('reset').onSnapshot((docData) => {
		restart();
	});

}