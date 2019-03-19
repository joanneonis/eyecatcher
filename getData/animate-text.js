
// let request;
// let frame = 0;

// document.addEventListener("DOMContentLoaded", () => {

// 	const textPath = document.querySelector('#textPath');
// 	const textContent = document.querySelector('#textContent');

// 	console.log('ready');
	
// 	textPath.setAttribute("startOffset", `${1}%`);

	
	
// 	const performAnimation = () => {
// 		frame += .05;
// 		request = requestAnimationFrame(performAnimation)
// 		// textPath.setAttribute("startOffset", `${frame}%`);
// 	}
// 	// cancelAnimationFrame(request) 
// 	requestAnimationFrame(performAnimation);
// });

let indexLetter = 0;
let indexWord = 1;

document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');
	
	window.setInterval(function(){
		// var textnode = document.createTextNode(`${loremArray[indexWord]} `);
		// textContent.prepend(textnode);

		// textContent.prepend(`${loremArray[indexWord]} `);

		console.log(loremArray[1].length);

		const letters = loremArray[indexWord].split('');

		for(let i = 0; i < loremArray[indexWord].length; i++) {
			setTimeout(function(){
				textContent.append(letters[i])
			}, 500);
		}

		textContent.append(' ')
		indexWord ++;
	}, 2000);
});





// const letters = loremArray[indexWord].split('');

// letters.forEach(letter => {
// 	textContent.append(letter); 
// });