// https://medium.freecodecamp.org/how-to-build-a-simple-speech-recognition-app-a65860da6108
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

const icon = document.querySelector('.btn')
let container = document.querySelector('.text-box');
let history = document.querySelector('.all-text');
const sound = document.querySelector('.sound');

icon.addEventListener('click', () => {
  dictate();
});

const dictate = () => {
  recognition.continuous = true;
  recognition.interimResults = true; //! supercool
  recognition.start();
  recognition.onresult = (event) => {
    let currentPos = event.results.length - 1;
    const speechToText = event.results[currentPos][0].transcript;

    container.textContent = speechToText;

    let historyText = event.results[currentPos][0].confidence + event.results[currentPos][0].transcript;
    addToHistory(historyText);

    if (event.results[0].isFinal) {
      if (speechToText.includes('test')) {
          // speak(getTime);
          console.log('je zei test!!!');
      };
		}
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
  node.appendChild(textnode);
  history.appendChild(node);
};