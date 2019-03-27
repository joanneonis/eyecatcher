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

  // restart hack
  recognition.onend = function() {
    dictate();
  }

  // event listner loggers (in helpers file)
  // recognitionEvents(recognition);
}

let sessionId = 0;

function pushHistoryfb(e) {
  showOnScreen(e);
  let name = sessionId.toString();
  db
  .collection("demo2")
  .doc("speechInput")
  .update({ [name] : e})
    .then(function () {
      sessionId ++;
      console.log("send");
    }).catch((error) => {
      console.log('oh nee!', error);
    });
}

function showOnScreen(e) {
  console.log("sending...", e);
  history.append(e);
}