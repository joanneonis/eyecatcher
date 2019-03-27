// https://medium.freecodecamp.org/how-to-build-a-simple-speech-recognition-app-a65860da6108
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
const synth = window.speechSynthesis;
const recognition = new SpeechRecognition();

// !testcode
const startBtn = document.querySelector('.btn');
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
  recognition.continuous = false;
  recognition.interimResults = false;  //? supercool
  recognition.start();

  console.log("started", recognition);

  recognition.onresult = (event) => {
    console.log("result", event);
    let currentPos = event.results.length - 1;
    const speechToText = event.results[currentPos][0].transcript;
    pushHistoryfb(process(speechToText));
  }

  // !!restart hack
  recognition.onend = function() {
    console.log("restart");
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
  .collection("demo3")
  .doc("speechInput")
  .update({ [name] : e})
    .then(function () {
      sessionId ++;
      console.log("send");
    }).catch((error) => {
      console.log('oh nee!', error);
    });
}

const showOnScreen = (text) => {
  console.log("sending...", text);

  var node = document.createElement("LI");
  var textnode = document.createTextNode(text);
  node.prepend(textnode);
  history.prepend(node);
};