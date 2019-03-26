// https://medium.freecodecamp.org/how-to-build-a-simple-speech-recognition-app-a65860da6108
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

// !testcode
const startBtn = document.querySelector('.btn')
let container = document.querySelector('.text-box');
let history = document.querySelector('.all-text');

startBtn.addEventListener('click', () => {
  dictate();
});
//!end testcode

let calculatedText = [];
let streamData = [];

let historyToAnalyse = {};
let lastEventTriggered = "";
let timeIndex = 0;

let calculatedWordsArray = [];

const dictate = () => {
  recognition.continuous = true;
  recognition.interimResults = false;  //? supercool
  recognition.start();

  recognition.onresult = (event) => {
    let currentPos = event.results.length - 1;
    const speechToText = event.results[currentPos][0].transcript;
    pushHistoryfb(process(speechToText));
  }

  recognitionEvents(recognition);
}

function recognitionEvents(recognition) {
  recognition.audiostart = function(e) {
    console.log('audiostart', e);
  }
  recognition.boundary = function(e) {
    console.log('boundary', e);
  }
  recognition.mark = function(mark) {
    console.log('audiostart', e);
  }
  recognition.onend = function() {
    console.log('Speech recognition service disconnected');
    dictate();
  }
  recognition.onspeechend = function(e) { 
    console.log('onspeechend', e); 
  }
  recognition.onsoundend = function(e) { 
    console.log('onsoundend', e); 
  }
}

let sessionId = 0;

function pushHistoryfb(e) {
  let name = sessionId.toString();
  db
  .collection("demo2")
  .doc("speechInput")
  .update({ [name] : e})
    .then(function () {
      // console.log("Document successfully written!");
      sessionId ++;
    }).catch((error) => {
      console.log('oh nee!', error);
    });
}

function sortByLength (array) {
	return array.sort((y,x) => x.length - y.length);
}

function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);
	tfidf.finish(0);
  tfidf.sortByScore();
	
	// tfidf.docFreq(text);

	var allKeys = tfidf.getKeys();
	const filteredResult = allKeys.filter(word => (allStupid.indexOf(word) === -1));
	const result = sortByLength(filteredResult); // .slice(0, 3)
	
	return result;
}
