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
  node.prepend(textnode);
  history.prepend(node);
};

let dummyText = `
Erik Pinksterblom ligt op een avond in zijn bed. Hij heeft de volgende dag een toets en heeft alles uit zijn hoofd geleerd over insecten. Daar heeft hij het boek 'Solms beknopte natuurlijke historie' voor gebruikt. 

Hij heeft het gevoel dat er iets bijzonders gaat gebeuren en opeens ziet hij dat het schilderij van zijn overgrootvader geen gewoon schilderij is. Alle personen in de schilderijen op zijn kamer beginnen te leven. Ze praten met hem en met elkaar. 

Dan zegt Erik dat hij wel zou willen weten wat er in Wollewei gebeurt. Het is het schilderij dat naast zijn bed hangt en hij zelf zo genoemd heeft. Opeens wordt hij zó klein dat hij in het schilderij kan stappen. Daar wordt hij nog veel kleiner, kleiner dan menig insect. 

Het eerste dier dat hij ontmoet is een wesp, waarvan hij de naam niet kan uitspreken (weps). Deze neemt hem mee naar zijn huis en familie en Erik mag daar eten. De wespen maken hem duidelijk dat het erg belangrijk is van adel te zijn en een angel te hebben. Helaas kiest Erik ervoor een gedicht voor te dragen over 'de nijvere bij' (waar wespen erg op neerkijken) en bespeelt hij een bromvlieg zo driftig, tijdens het muziekuurtje van de familie, dat de vlieg overlijdt. Daarmee verliest hij zijn aanzien en trekt verder. 

Hij vliegt op de rug van een hommel, die zelf zegt filosoof te zijn, naar een hotel. Het hotel is een groot oud slakkenhuis en er wonen veel verschillende dieren. De eigenaar is een slak. De dieren hebben veel interesse voor hem en komen erachter dat Erik veel van hen af weet. Dit heeft hij natuurlijk allemaal geleerd uit 'Solms' boek. Het gaat zelfs zo ver dat de dieren aan Erik gaan vragen wat ze moeten doen, waarop hij antwoord dat ze moeten vertrouwen op hun instinct. Gewoon doen wat ze altijd hebben gedaan. Na een tijd daar gewoond te hebben vertrekt Erik op de rug van een pas ontpopte vlinder weer de weide wereld in.

Helaas wordt die vlinder verliefd en trouwt, na het voordragen van een gedicht dat hij samen met Erik gemaakt heeft, met een vlindervrouwtje. Erik staat weer alleen. 

Hij loopt alleen verder en gebruikt een dennennaald als wapen, want de insecten zijn niet zo aardig meer tegen hem. Hij heeft zijn wapen hard nodig als hij een zwarte weduwe tegenkomt en haar web kapotmaakt. Gelukkig herkent hij de manier waarop zij aanvalt en steekt de dennennaald in haar lijf. Erik overleeft het en de spin niet. 
`;

let keywordContainer = document.querySelector('.keywords');

process(dummyText);

function process(text) {
  tfidf = new TFIDF();

  // Process this data into the tfidf object
  tfidf.termFreq(text);
	tfidf.finish(0);
  tfidf.sortByScore();
	
	tfidf.docFreq(dummyText);
	showResults();
}


/* 
TODO 
To get topresults: 
- filter dumb words
- get count, sort accordingly
- same score? sort by word length?

!TODO
!based of speech transcript, if length > ?
*/

function showResults() {
	// Get all the words
	var allKeys = tfidf.getKeys();
	var keys = allKeys.filter(word => word.length > 6);

	var howmany = Math.min(10, keys.length);

	// Get the count for each word and display
	for (var i = 0; i < howmany; i++) {
		var score = tfidf.getScore(keys[i]);

		var node = document.createElement("LI");
		var textnode = document.createTextNode(keys[i] + ': ' + tfidf.dict[keys[i]].count + ' & score = '+ score);
		node.appendChild(textnode);
		keywordContainer.appendChild(node);

		highlight(keys[i], tfidf.dict[keys[i]].count);
	}
}

function filterStupid() {
	// theArray.filter(word => word.length > 6);
}

// TODO highlight each word
// temp performance beast
function highlight(text, wordCount) {
  var inputText = document.getElementById("inputText");
  var innerHTML = inputText.innerHTML;
	var index = innerHTML.indexOf(text);
	// console.log(index);
  if (index >= 0) { 
   innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
   inputText.innerHTML = innerHTML;
  }
}