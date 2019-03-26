function tube(dom, arr, i) {
	let letters = [];
	// console.log(calculatedWordsArray); 
	if (arr.length === word[i]) { 
		if (dom.textContent.length < 90) { dom.prepend("\u00A0");  }
		
		return;
	} 

	if (arr === 0) { return }

	letters = arr[word[i]].split('');
	letters.reverse();

	if(dom.textContent.length > 50) {  // 43 fit in tube
		//? if prepend last character should be removed & also letters.reverse() should be there
		dom.textContent = dom.textContent.substring(0, dom.textContent.length-1);
	}

	if (count[i] < letters.length) {
		dom.prepend(letters[count[i]]);
	} else {
		dom.prepend(' ');
		word[i] ++;
		count[i]= -1;
	}
	count[i]++;

	if(dom.textContent.length > 43) {  // 43 fit in tube, 
		//? if append first item should be removed
		// textContent.textContent = textContent.textContent.substr(1);
	}
}