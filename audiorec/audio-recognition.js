// https://medium.freecodecamp.org/how-to-build-a-simple-speech-recognition-app-a65860da6108
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const startBtn = document.querySelector('.btn')
// let container = document.querySelector('.text-box');
// let history = document.querySelector('.all-text');

startBtn.addEventListener('click', () => {
  dictate();
});

let calculatedText = [];
let streamData = [];

const dictate = () => {
  recognition.continuous = true;
  recognition.interimResults = true; //! supercool
  recognition.start();
  recognition.onresult = (event) => {
    let currentPos = event.results.length - 1;
    const speechToText = event.results[currentPos][0].transcript;

    updateData('words', 'recognition', [{ calculatedText: speechToText }]);

    // container.textContent = speechToText;

    let historyText = event.results[currentPos][0].confidence + event.results[currentPos][0].transcript;
    addToHistory(historyText);

    streamData.push({confidence: event.results[currentPos][0].confidence, transcript: event.results[currentPos][0].transcript});
    updateData('words', 'recognition', [{ stream: streamData }]);

    if (event.results[0].isFinal) {
      if (speechToText.includes('test')) {
          // speak(getTime);
          console.log('je zei test!!!');
      };
		}
  }

  // testEvents();
}

function testEvents() {
  recognition.onsoundstart = function(e) { 
    console.log('onsoundstart', e); 
  }
  recognition.onspeechstart = function(e) { 
    console.log('onspeechstart', e); 
  }
  recognition.onspeechend = function(e) { 
    console.log('onspeechend', e); 
  }
  recognition.onsoundend = function(e) { 
    console.log('onsoundend', e); 
  }
  recognition.onaudioend = function(e) { 
    console.log('onaudioend', e); 
  }
}

const speak = (action) => {
  utterThis = new SpeechSynthesisUtterance(action());
  synth.speak(utterThis);
};

const getTime = () => {
  const time = new Date(Date.now());
  return `the time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
};

const addToHistory = (text) => {
  var node = document.createElement("LI");
  var textnode = document.createTextNode(text);
  node.prepend(textnode);
  history.prepend(node);
};