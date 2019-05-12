/************************************************
INTERACTIVITY
************************************************/

// SETUP EVENT LISTENERS
function setupInteraction() {

  // TONE TOGGLE CLICK AND MOUSE EVENTS
  for (var i = 0; i < toneToggleDivs.length; i++) {

    // CLICK
    toneToggleDivs[i].addEventListener("click", function(e) {
      // e.preventDefault();
      var id = e.target.getAttribute("id");
      for (let i=0; i<numBeats; i++) {
        for (let j=0; j<numToggles; j++) {
          if (toneToggles[i][j].id == id) {
            toneToggles[i][j].toggle();
          }
        }
      }
      // toneToggles[id].toggle();
    }, false);
  }

  // KEYBOARD EVENTS
  var keyCodes = ["a", "s", "d", "f", "j", "k", "l", ";"];
  document.addEventListener('keydown', function(e) {
    // TABBING
    if (e.key === 'Tab') { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
    }

    // MUTE/UNMUTE
    if (e.key === ' ' ) {
      updatePlaying();
    }
  }, false);

  // RANDOM BUTTONS
  let rb = document.querySelectorAll('.random-btn');
  for (let i=0; i < rb.length; i++) {
    rb[i].addEventListener('click', function(e){
      console.log(e);
      e.preventDefault();
      e.target.blur();
      randomizeToggle(e.target.id);
      updateRandomButtonStatus(e.target.id);
    }, false);
  }

  // PLAY/PAUSE BUTTON
  document.querySelector("#play-toggle").addEventListener('click', function(e){
    updatePlaying();
    e.target.blur();
  }, false);

  // SOUND SELECTOR
  document.querySelector('.sound-selector').addEventListener('click', function(e){
    let s = e.target.value;
    if (s == "tones" && beatsMode || s == "beats" && !beatsMode) {
      updateToggleDisplays();
      updateToggleStatus(e);
    }
  }, false);

  // MOBILE SOUND SELECTOR
  let ssm = document.querySelector("#sound-selector-mini");
  ssm.addEventListener('click', function(e){
    updateToggleDisplays();
    if (!beatsMode) {
      ssm.innerHTML = "Tones";
    } else {
      ssm.innerHTML = "Beats";
    }
    e.target.blur();
  }, false);

  // TEMPO SLIDER
  tempoControl.addEventListener("input", function() {
    bpm = Number(this.value);
    document.querySelector("#tempo-readout").innerHTML = this.value;
    calcDelay();
    // console.log(bpm);
  }, false);

  // REFRESH BUTTON
  document.querySelector("#refresh-btn").addEventListener('click', function(e){
    setTones();
    updateToggleTones();
    e.target.blur();
  }, false);

  // CLEAR BUTTON
  document.querySelector("#clear-btn").addEventListener('click', function(e){
    clearTones();
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.add("visible");
  }, false);

  // CLOSE ABOUT TOGGLE
  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-close").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.remove("visible");
  }, false);
}

/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  let toggleButtons = document.querySelectorAll('.toggle');
  for (var i=0; i<toggleButtons.length; i++) {
    toggleButtons[i].classList.remove('selected');
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add( "selected" );
}

function updateRandomButtonStatus(id) {
  // GET ALL RANDOM BUTTONS
  let randomButtons = document.querySelectorAll('.random-btn');

  // UPDATE CLICKED RANDOM BUTTON
  let r = randomButtons[id];
  console.log(r, r.value);
  if (r.value == "off") {
    r.classList.remove("random-btn-off");
    r.classList.add("random-btn-on");
    r.value = "on"
  } else {
    r.classList.remove("random-btn-on");
    r.classList.add("random-btn-off");
    r.value = "off";
  }

}
