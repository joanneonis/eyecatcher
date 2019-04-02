	document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');

	const textPath2 = document.querySelector('#textPath2');
	const textContent2 = document.querySelector('#textContent2');

	window.setInterval(function(){
		if (!appState) { return; }

		if (idleMode) {
			console.log('pushing');
			collectedDataOne.push('datastad', 'spoorzone');
		} 
		
		let col1 = collectedDataOne.filter((word, i) => (i %2 === 0));
		let col2 = collectedDataOne.filter((word, i) => (i %2 != 0));
		

		tube(textContent, col1, 0);
		tube(textContent2, col2, 1);
		
		// console.log(collectedData[1]);
		
		// tube(textContent, loremArray, 0);
		
		
		// TODO should be this
		// tube(textContent, collectedData[0], 0);
		// tube(textContent2, collectedData[1], 1);
		
	}, 200);
});
