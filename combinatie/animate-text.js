let indexWord = 0;
let i = 0;

document.addEventListener("DOMContentLoaded", () => {
	const textPath = document.querySelector('#textPath');
	const textContent = document.querySelector('#textContent');

	const textPath2 = document.querySelector('#textPath2');
	const textContent2 = document.querySelector('#textContent2');

	window.setInterval(function(){
		// console.log(calculatedWordsArray);
		let letters = loremArray[indexWord].split('');
		let letters2 = loremArray[indexWord].split('');
		letters.reverse();

		if(textContent.textContent.length > 43) {  // 43 fit in tube
			//? if prepend last character should be removed & also letters.reverse() should be there
			textContent.textContent = textContent.textContent.substring(0, textContent.textContent.length-1);
			textContent2.textContent = textContent2.textContent.substring(0, textContent2.textContent.length-1);
		}

		if (i < letters.length) {
			textContent.prepend(letters[i]);
			textContent2.prepend(letters2[i]);
		} else {
			textContent.prepend(' ');
			textContent2.prepend(' ');
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