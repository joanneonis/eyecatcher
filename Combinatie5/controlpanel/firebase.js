
// let collectedData = [];

require([
	'@firebase/app',
	'@firebase/firestore'
], function (firebase) {
	firebase.initializeApp(config);
	db = firebase.firestore();
	initialized = true;
	initApp();
});

let resetCount;
let appState = false;
let idleModus = false;

function cleanData() {
	setData('demo3', 'speechInput', [{}]);
}
function resetPos() {
	setData('appSettings', 'screenSettings', [{pos: 0, pos1: 0}]);
}
function setAppState(e) {
	setData('appSettings', 'state', [{running: e}]);
}

function setIdleMode(e) {
	setData('appSettings', 'idle', [{modus: e}]);
}

let theWord;
let theKey;

function getAppState() {
	db.collection('appSettings').doc('state').onSnapshot((docData) => {
		appState = docData.data().running;
		document.querySelector('.appstate').textContent = appState.toString();
		document.querySelector('.appstate').classList = `appstate ${appState}`;
	});

	db.collection('appSettings').doc('emotie').onSnapshot((docData) => {
		theKey = docData.data().theKey;
		theWord = docData.data().theWord;
		document.querySelector('.tubes__emotion').classList = `tubes__emotion ${theKey}`;
		document.querySelector('#theKey').textContent = theKey.toString();
		document.querySelector('#theWord').textContent = theWord.toString();
	});

	db.collection('appSettings').doc('idle').onSnapshot((docData) => {
		idleModus = docData.data().modus;
		document.querySelector('.idlemodus').textContent = idleModus.toString();
		document.querySelector('.idlemodus').classList = `idlemodus ${idleModus}`;
		document.querySelector('.toggleidleModus').classList = `toggleidleModus ${idleModus}`;
	});
}

function getInput() {
	db.collection('demo3').doc('speechInput').onSnapshot((docData) => {
		console.log('from demo', docData.data());
	});
}

document.querySelector('.toggleappstate').addEventListener('click', () => {
	appState = !appState;
  setAppState(appState);
});

function initApp() {
	// getData('3','speechInput');

	
	cleanData();
	setIdleMode(false);
	setAppState(false);
	getAppState();
	getInput();

	db.collection('appSettings').doc('reset').onSnapshot((docData) => {
		resetCount = docData.data().count;
	});
}