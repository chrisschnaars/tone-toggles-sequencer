/************************************************
GLOBAL VARIABLES
************************************************/

// ACTIVE BEAT
let numBeats = 8;
let activeBeat = 0;
let previousBeat = numBeats - 1;

// GLOBAL PLAYING INDICATOR
let playing = false;

// TEMPO CONTROL
const tempoControl = document.querySelector(".js-tempo-control");
let bpm = Number(tempoControl.value);
let delay;  // TIMER FOR SET TIMEOUT

/************************************************
MAIN FUNCTIONALITY
************************************************/

// SETUP
window.onload = function() {
  // SETUP DOM AND INTERACTIVITY
  createToggles();
  setupInteraction();
  calcDelay();

  // RUN ONBOARDING ANIMATION
  onboard();

  // SETUP AUDIO
  setupAudioPlayback();
};


function onboard() {
  for (let i=0; i<numBeats; i++) {
    for (let j=0; j<numToggles; j++) {
      (function(i){
          setTimeout(function(){
              toneToggles[i][j].animate(360);
          }, 200 + (i * 80 + j * 80));
      })(i);
    }
  }
}


/************************************************
HELPERS
************************************************/

// Calculate delay time given BPM
function calcDelay() {
  delay = 60000/bpm*4;
  // dleay = 60000/bpm;
}

// GET RANDOM NUMBER
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// SORT ARRAY OF NUMBERS IN NUMERICAL ORDER
function sortNumber(a,b) {
   return a - b;
}
