let indexWord = 0;
let i = 0;

document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');

	window.setInterval(function(){
		let letters = loremArray[indexWord].split('');
		letters.reverse();

		if(textContent.textContent.length > 43) {  // 43 fit in tube
			//? if prepend last character should be removed & also letters.reverse() should be there
			textContent.textContent = textContent.textContent.substring(0, textContent.textContent.length-1);
		}

		if (i < letters.length) {
			textContent.prepend(letters[i]);
		} else {
			textContent.prepend(' ');
			indexWord ++;
			i = -1;
		}
		i++;

		if(textContent.textContent.length > 43) {  // 43 fit in tube, 
			//? if append first item should be removed
			// textContent.textContent = textContent.textContent.substr(1);
		}
	}, 200);

});