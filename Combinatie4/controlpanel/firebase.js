
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

let appState = false;

function cleanData() {
	setData('demo3', 'speechInput', [{0: ['hoi', 'test']}]);
}
function resetPos() {
	setData('appSettings', 'screenSettings', [{pos: 0, pos1: 0}]);
}
function setAppState(e) {
	setData('appSettings', 'state', [{running: e}]);
}

function getAppState() {
	db.collection('appSettings').doc('state').onSnapshot((docData) => {
		appState = docData.data().running;
		document.querySelector('.appstate').textContent = appState.toString();
	});
}

document.querySelector('.toggleappstate').addEventListener('click', () => {
	appState = !appState;
  setAppState(appState);
});

function initApp() {
	// getData('3','speechInput');

	cleanData();

	setAppState(false);
	getAppState();
}