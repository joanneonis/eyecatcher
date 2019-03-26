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

    container.textContent = speechToText;

    let historyText = event.results[currentPos][0].transcript;
    addToHistory(historyText);
    createDbHistory(historyText);

    streamData.push({confidence: event.results[currentPos][0].confidence, transcript: event.results[currentPos][0].transcript});

    if (event.results[0].isFinal) {
      console.log('last but not least, calculated sentence:', event.results[0].transcript);
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
    processTheRightText();
  }, 5000);

  // keep track of the events!
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
  timeIndex ++;
}

const addToHistory = (text) => {
  var node = document.createElement("SPAN");
  var textnode = document.createTextNode(text);
  node.prepend(textnode);
  history.prepend(node);
}

// !estje met unieke woorden doet het niet
function unique(old, newArray) {
  // return a.filter(word => (b.indexOf(word) === -1))
  // return a.filter(word => !arr.includes(word));
  
  // let unique = {};
  // names.forEach(function(i) {
  //   if(!unique[i]) {
  //     unique[i] = true;
  //   }
  // });

  let cleanNew;

  old.forEach((word) => {
    const index = newArray.indexOf(word);

    if (index === -1) {
      newArray.splice(index, 1);
    }
  });

  return newArray;

  // return Object.keys(unique);
  // return newArray;
}


function createDbHistory(text) {
  lastEventTriggered = "addToHistory";

  index = timeIndex.toString();

  if (!historyToAnalyse[index]) {
    historyToAnalyse[index] = [];
  }
  
  historyToAnalyse[index] = [...historyToAnalyse[index], text.toString()];
  
  if (historyToAnalyse) {
    // db
    // .collection("demo2")
    // .doc("speechInput")
    // .set(historyToAnalyse)
    //   .then(() => {
    //     // console.log("added new array");
    //   }).catch((error) => {
    //     console.log('oh nee!', error);
    //   });

      // console.log(typeof historyToAnalyse[index], historyToAnalyse[index]);

      // if (typeof text !== "object") { returnText = text.split(/\W+/); }
      // if (typeof text === "object") { Object.keys(text).map((objectKey, index) => { var value = text[objectKey]; console.log(value); }); }
    
      // Object.keys(text).map((objectKey, index) => { 
      //   let value = text[objectKey]; console.log(value); 
      //   process(value);
      // });
  }
}

function toFirebase(input) {
  db
  .collection("demo2")
  .doc("speechInput")
  .set(input)
    .then(() => {
      // console.log("added new array");
    }).catch((error) => {
      console.log('oh nee!', error);
    });
}
 
let prevCalculated;
function processTheRightText() {
  let sendTofirebase;
  if (index || index >= 0) {
    // console.log(process(historyToAnalyse[index].join()));

    // if (index > 0) {
    //   let toAnalyse = unique(prevCalculated, historyToAnalyse[index]);
    //   console.log(historyToAnalyse[index], prevCalculated, toAnalyse);
    //   // console.log(process(toAnalyse.join()));
    // } else {
    //   console.log(process(historyToAnalyse[index].join()));
    // }

    prevCalculated = process(historyToAnalyse[index].join());
    sendTofirebase = process(historyToAnalyse[index].join());
    toFirebase(sendTofirebase);
  }
  // !toFirebase(input);
  // index = timeIndex.toString();

  // if (!historyToAnalyse[index]) {
  //   historyToAnalyse[index] = [];
  // }
  
  // historyToAnalyse[index] = [...historyToAnalyse[index], text.toString()];
}