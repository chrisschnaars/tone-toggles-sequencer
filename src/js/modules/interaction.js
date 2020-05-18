/************************************************
INTERACTIVITY
************************************************/

// SETUP EVENT LISTENERS
function setupInteraction() {

  // TONE TOGGLE CLICK EVENTS
  for (let i=0; i < toneToggleDivs.length; i++) {
    toneToggleDivs[i].addEventListener("click", function(e) {
      // e.preventDefault();
      let id = e.target.getAttribute("id");

      for (let i=0; i<numBeats; i++) {
        for (let j=0; j<numToggles; j++) {
          if (toneToggles[i][j].id == id) {
            toneToggles[i][j].toggle();
          }
        }
      }
    }, false);
  }

  // TONE TOGGLE KEYBOARD EVENTS
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
  let rb = document.querySelectorAll('.js-random-btn');
  for (let i=0; i < rb.length; i++) {
    rb[i].addEventListener('click', function(e){
      e.preventDefault();
      e.target.blur();
      randomizeToggle(e.target.id);
      toggleRandomButtonState(e.target.id);
    }, false);
  }

  // PLAY/PAUSE BUTTON
  document.querySelector(".js-play-toggle").addEventListener('click', function(e){
    updatePlaying();
    e.target.blur();
  }, false);

  // SOUND SELECTOR
  document.querySelector('.js-sound-bank-toggle').addEventListener('click', function(e){
    let s = e.target.value;
    if (s == "tones" && beatsMode || s == "beats" && !beatsMode) {
      updateToggleDisplays();
      updateToggleStatus(e);
    }
  }, false);

  // MOBILE SOUND SELECTOR
  let ssm = document.querySelector(".js-sound-bank-toggle-mini");
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
    document.querySelector(".js-tempo-readout").innerHTML = this.value;
    tempoControl.setAttribute('aria-valuenow', bpm);
    tempoControl.setAttribute('value', bpm);
    calcDelay();
  }, false);

  // REFRESH BUTTON
  document.querySelector(".js-refresh-btn").addEventListener('click', function(e){
    setTones();
    updateToggleTones();
    e.target.blur();
  }, false);

  // CLEAR BUTTON
  document.querySelector(".js-clear-btn").addEventListener('click', function(e){
    clearTones();
    e.target.blur();
  }, false);

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector(".js-about-open-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.add("about--visible");
  }, false);

  // CLOSE ABOUT TOGGLEL
  document.querySelector(".js-about-close-btn").addEventListener("click", function() {
    document.querySelector(".about").classList.remove("about--visible");
  }, false);
}

/************************************************
TOGGLE GROUP UPDATES
************************************************/

// UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
function updateToggleStatus(e) {
  // REMOVE SELECTED CLASS FROM ALL TOGGLES
  var toggles = document.querySelectorAll(".btn--toggle");
  for (var i=0; i<toggles.length; i++) {
    toggles[i].classList.remove("btn--toggle-selected");
  }

  // ADD SELECTED CLASS TO SELECTED
  e.target.classList.add("btn--toggle-selected");
}


// TOGGLE RANDOM BUTTON STATE
function toggleRandomButtonState(id) {

  // GET ALL RANDOM BUTTONS
  let randomButtons = document.querySelectorAll('.js-random-btn');

  // UPDATE CLICKED RANDOM BUTTON
  let r = randomButtons[id];
  if (r.value == "off") {
    r.classList.remove("btn--random-off");
    r.classList.add("btn--random-on");
    r.classList.add("btn--toggle-selected");
    r.value = "on"
  } else {
    r.classList.remove("btn--random-on");
    r.classList.remove("btn--toggle-selected");
    r.classList.add("btn--random-off");
    r.value = "off";
  }

}
