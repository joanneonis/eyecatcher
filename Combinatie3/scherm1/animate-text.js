function tube(dom, arr, i) {
	let letters = [];
	console.log(arr.length, word[i]); 
	if (arr.length === word[i]) { 
		// if (dom.textContent.length < 200) { dom.prepend("\u00A0");  }
		dom.prepend("\u00A0");
		return;
	} 

	if (arr === 0) { return }

	letters = arr[word[i]].split('');
	letters.reverse();

	if (count[i] < letters.length) {
		dom.prepend(letters[count[i]]);
	} else {
		dom.prepend(' ');
		word[i] ++;
		count[i]= -1;
	}
	count[i]++;

	// console.log(dom.textContent.length);
	// if(dom.innerHTML.length > 20) {  // 43 fit in tube
	// 	dom.textContent = textContent.textContent.substring(0, textContent.textContent.length-1);
	// }

	animateColor(dom);
}

let lastEmotion;

function animateColor(dom) {

	let textTocheck = dom.textContent.split(" ");
	// emotions.forEach(name => {
		
	// });

	Object.keys(emotions).forEach((key) => {
    emotions[key].forEach(word => {
			if (textTocheck.indexOf(word) > -1) {
				console.log(key, word);
				dom.parentElement.parentElement.parentElement.classList = key;
				// dom.parentElement.parentElement.parentElement.classList.add(key);
			}
		});
	});

	// if (dom.textContent.split(" ").indexOf('blij') > -1) {
	// 	if (lastEmotion != 'blij') {
	// 		dom.parentElement.parentElement.parentElement.classList.remove('sad');
	// 		dom.parentElement.parentElement.parentElement.classList.add('happy');
	// 		lastEmotion = 'happy';
	// 	}
	// }
}