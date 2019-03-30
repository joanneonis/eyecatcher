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
    // dictate();
  }
  recognition.onspeechend = function(e) { 
    console.log('onspeechend', e); 
  }
  recognition.onsoundend = function(e) { 
    console.log('onsoundend', e); 
  }
}