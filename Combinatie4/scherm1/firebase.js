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
