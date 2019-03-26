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
  recognition.interimResults = true;  //? supercool
  recognition.start();
  recognition.onresult = (event) => {
    let currentPos = event.results.length - 1;
    const speechToText = event.results[currentPos][0].transcript;
    const isTextFinal = event.results[currentPos].isFinal;

    // updateData('words', 'recognition', [{ calculatedText: speechToText }]);

    container.textContent = speechToText;
    // addNode(speechToText);

    let historyText = event.results[currentPos][0].transcript; // event.results[currentPos][0].confidence + 
    addToHistory(historyText);

    streamData.push({confidence: event.results[currentPos][0].confidence, transcript: event.results[currentPos][0].transcript});
    // updateData('words', 'recognition', [{ stream: streamData }]);

    if (event.results[0].isFinal) {
      // todo split into words 
      calculatedWordsArray.push(speechToText);

      if (speechToText.includes('test')) {
          // speak(getTime);
          console.log('je zei test!!!');
      };
		}
  }

  window.setInterval(function(){
    addLine();
  }, 5000);

  recognition.onend = function() {
    console.log('Speech recognition service disconnected');
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

const addLine = () => {
  if (lastEventTriggered !== "addLine") {
    var node = document.createElement("div");
    history.prepend(node);
    console.log("triggered");
  }
  
  lastEventTriggered = "addLine";
  // console.log("addLine");
  timeIndex ++;
}

const addToHistory = (text) => {
  var node = document.createElement("SPAN");
  var textnode = document.createTextNode(text);
  node.prepend(textnode);
  history.prepend(node);

  lastEventTriggered = "addToHistory";
  // console.log("addToHistory");

  index = timeIndex.toString();

  if (!historyToAnalyse[index]) {
    historyToAnalyse[index] = [];
  }
  
  console.log("hier", historyToAnalyse[index], "tese", text);
  historyToAnalyse[index] = [...historyToAnalyse[index], text.toString()];
  
  if (historyToAnalyse) {
    // setData("demo2", "speechInput", historyToAnalyse);
    db
    .collection("demo2")
    .doc("speechInput")
    .set(historyToAnalyse)
      .then(function () {
        // console.log("Document successfully written!");
      }).catch((error) => {
        console.log('oh nee!', error);
      });
  }
}
 