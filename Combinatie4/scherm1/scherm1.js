let word = [0, 0];
let count = [0, 0];

document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');

	const textPath2 = document.querySelector('#textPath2');
	const textContent2 = document.querySelector('#textContent2');

	window.setInterval(function(){
		if (!appState) { return; }
		tube(textContent, collectedData[0], 0);
		tube(textContent2, collectedData[1], 1);
		// tube(textContent2, collectedData, indexWord2, j);
	}, 200);
});
