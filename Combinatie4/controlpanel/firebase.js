
let collectedData = [];

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

function getData(collection, doc) {
	db.collection(collection).doc(doc).onSnapshot((docData) => {
		let data = docData.data();
		// collectedData[collection] = [...data, ...collectedData];

		console.log(data);
	});
}

function initApp() {
	getData('demo2','speechInput');
}