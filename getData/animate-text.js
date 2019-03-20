
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

let indexWord = 0;
let i = 0;

document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');

	window.setInterval(function(){
		const letters = loremArray[indexWord].split('');

		if (i < letters.length) {
			textContent.append(letters[i]);
		} else {
			textContent.append(' ');
			indexWord ++;
			i = -1;
		}
		i++;

		if(textContent.textContent.length > 43) {  // 43
			textContent.textContent = textContent.textContent.substr(1);
		}
	}, 200);

});
