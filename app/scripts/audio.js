/************************************************
TONE SETUP
************************************************/

// GLOBAL KEY VARIABLE
let key;  // root frequency
let keyIndex; // array index of key selection
let tones; // array of selected playback tones
let notesDisplay; // array of notes toggles will display

// FUNCTION TO CREATE SELECTION OF TONES FOR PLAYBACK
function setTones() {
  keySelection();
  noteSelection();
}

// RANDOM KEY SELECTION
function keySelection() {
  // SELECT A RANDOM KEY
  keyIndex = getRndInteger(0, keyFrequencies.length - 1);
  // SET RANDOM OCTAVE SELECTION
  let o = getRndInteger(0, 2);
  let octaveDivider;
  if (o<1) {
    octaveDivider = 1;
  } else {
    octaveDivider = 2;
  }
  // SET KEY
  key = keyFrequencies[keyIndex] / octaveDivider;
}

// GET A RANDOM SELECTION OF TONES
// ALWAYS INCLUDE THE ROOT TONE
function noteSelection() {
  // CLEAR EXSISTING TONE SELECTION
  tones = [];
  notesDisplay = [];

  // GENERATE RANDOM NOTE SELECTION
  // https://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100
  let randomSelects = [];
  while (randomSelects.length < (numToggles - 1)) {
    let r = Math.floor(Math.random() * (scaleIntervals.length-1)) + 1;
    if (randomSelects.indexOf(r) === -1) randomSelects.push(r);
  }

  // SORT RANDOM SELECTS ARRAY IN ORDER
  randomSelects.sort(sortNumber);

  // SET TONE SELECTION ARRAY
  for (let i=0; i<numToggles; i++) {
    let t;
    if (i == 0) {
      t = 0;
    } else {
      t = randomSelects[i-1];
    }
    // UPDATE TONE AND NOTE ARRAY
    tones.push(scaleIntervals[t]);
    notesDisplay.push(scaleNotes[keyIndex][t]);
  }
}


/************************************************
OSCILLATOR SETUP
************************************************/

// Create Audio Context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

// OSCILLATOR
var osc;
var wave;

// GAIN
var masterGainNode;
var gainNode;

// TONE SETTINGS
var toneLength = 3;
var gainValue = 1;

// SETUP AUDIO
function setupAudioPlayback() {
  setupMasterGain();  // set master gain
  initOsc();  // initialize oscillators
  // initBeats(); // initialize beats
}

// MASTER GAIN VALUE FOR ALL OSCILLATORS
function setupMasterGain() {
  // Master Gain
  masterGainNode = audioCtx.createGain();
  masterGainNode.connect(audioCtx.destination);
  masterGainNode.gain.value = gainValue;
}

// INITIALIZE OSCILLATOR
function initOsc() {
  // Setup Wave
  wave = audioCtx.createPeriodicWave(wavetable.real, wavetable.imag);

  // Oscillator
  osc = audioCtx.createOscillator();
  osc.setPeriodicWave(wave);

  // Gain Node
  gainNode = audioCtx.createGain();

  // Connect Oscillator tp Gain, Gain to Destination
  osc.connect(gainNode);
  gainNode.connect(masterGainNode);
}

// START OSCILLATORS
function playOsc(freq) {
  // Re-initialize Oscillator
  initOsc();

  // Configure Osc
  var time = audioCtx.currentTime;
  osc.frequency.value = freq * key;
  gainNode.gain.setValueAtTime(gainValue, time);

  // Play
  osc.start(time);
  stopOsc(time);
  playing = true;
}

// STOP OSCILLATORS
function stopOsc(time) {
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + toneLength);
  osc.stop(time + toneLength);
  playing = false;
}

// **************************************
// PLAY TONE
// **************************************

// PLAY TIMER
var timer;

// PLAY TONE TO THE RUNNING TIMER
// This is used for the toggle on/off when clicked
function playTones() {
  timer = setTimeout(function myTimer() {
    // TONE TOGGLE PLAY FUNCTION
    for (var i=0; i<numToggles; i++) {
      toneToggles[activeBeat][i].play();
    }

    // ACTIVATE CONTAINERS
    toneToggleContainerDivs[previousBeat].classList.remove('active-beat-container');
    toneToggleContainerDivs[activeBeat].classList.add('active-beat-container');

    // RESET TIMER
    timer = setTimeout(myTimer, delay/numBeats);

    // INCREMENT ACTIVE BEAT
    activeBeat++;
    if (activeBeat >= numBeats) {
      activeBeat = 0;
    }

    // INCREMENT PREVIOUS BEAT
    previousBeat++;
    if (previousBeat >= numBeats) {
      previousBeat = 0;
    }

  });
}

// STOP TONES PLAYING
function stopTones() {
  clearTimeout(timer);
}

// **************************************
// PLAYBACK CONTROLS
// **************************************

// TOGGLE PLAYING
function updatePlaying() {
  // PLAY TOGGLE DOM ELEMENT
  var playToggle = document.querySelector("#play-toggle");

  // TOGGLE PLAYING
  if (playing) {
    // STOP OSCILLATORS
    stopTones();
    // Update Button State
    playToggle.classList.remove("pause-btn");
    playToggle.classList.add("play-btn");
    // Update boolean
    playing = false;
  } else {
    // START OSCILLATORS
    playTones();
    // Update Button State
    playToggle.classList.remove("play-btn");
    playToggle.classList.add("pause-btn");
    // Update boolean
    playing = true;
  }
}
