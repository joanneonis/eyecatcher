const artyom = new Artyom();

const buttonTrigger = document.getElementById("sayword");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const speechLog = document.getElementById("speech-log__inner");

let textSaid;

// artyom.initialize({
// 	continuous:true,
// 	lang:"nl-NL",
// 	executionKeyword: "and do it now",
// 	listen:true,
// 	debug:true
// });

try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = false;

// This block is called every time the Speech APi captures a line. 
recognition.onresult = function(event) {

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
  var current = event.resultIndex;

  // Get a transcript of what was said.
  var transcript = event.results[current][0].transcript;

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    textSaid += transcript;
	}
	
	console.log("Herkend:", event.results[current][0].transcript);
	speechStuff.appendText(event.results[current][0].transcript);
};

recognition.onstart = function() { 
  console.log('started recording');
}

recognition.onspeechend = function() {
  console.log('ended recording');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    console.log('No speech was detected. Try again.');  
  };
}



const speechStuff = {

	init() {
		document.addEventListener('DOMContentLoaded', () => {
      buttonTrigger.addEventListener("click", () => {
				// this.sayWord('data eyecatcher kan nederlands praten');
			});

			startBtn.addEventListener("click", () => {
				recognition.start();
			});

			stopBtn.addEventListener("click", () => {
				recognition.stop();
			});
		});
	},

	// sayWord(word) {
	// 	artyom.say(word,{
	// 		onStart:function(){
	// 				console.log("Start tekst voorlezen");
	// 		},
	// 		onEnd:function(){
	// 				console.log("Tekst gelezen!");
	// 		}
	// 	});
	// }

	 appendText(text) {
		var node = document.createElement("LI");
		var textnode = document.createTextNode(text);
		node.appendChild(textnode);
		speechLog.appendChild(node);
	}
}

speechStuff.init();
