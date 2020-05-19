/************************************************
TOGGLE SETTINGS
************************************************/

// TONE TOGGLE VARIABLES
const numToggles = 5; // number of tone toggles per beat
let toneToggles = []; // array of all tone toggle objects

// TONE TOGGLE DOM ELEMENTS
let toneToggleDivs; // array of all div containers for each toggle
let toneToggleContainerDivs; // array of each container of toggles

// PLAYBACK
let beatsMode = false; // INDICATOR IF USER HAS SWITCHED TO BEATS SOUNDS

// CREATE TOGGLES
function createToggles() {
    createToggleObjects();
    createRandomButtons();
    setTones();
    updateToggleTones();
}

// INITIALIZE TONE TOGGLE OBJECTS
function createToggleObjects() {
    // SET INDEX FOR UNIQUE TOGGLE ID
    let index = 0;

    // CREATE TONE TOGGLES CONTAINER FOR BEAT
    for (let i = 0; i < numBeats; i++) {
        // CREATE BEAT CONTAINER
        let ttc = document.createElement('div');
        ttc.classList.add('beat-container');

        // ADD BEAT CONTAINER TO PARENT
        let pD = document.querySelector('.main-container');
        pD.append(ttc);

        // CREATE TEMPORARY HOLDING ARRAY FOR EACH BEAT'S TOGGLES
        let tmpArry = [];

        // CREATE TOGGLES
        for (let j = 0; j < numToggles; j++) {
            // CREATE TONE TOGGLE OBJECT
            tmpArry[j] = new ToneToggle(index, i);

            // CREATE TONE TOGGLE DIV ELEMENT
            var t = document.createElement('div');
            t.id = index; // add id
            t.classList.add('tone-toggle', 'beat-' + i);

            // ADD NOTE DISPLAY ELEMENT
            let p1 = document.createElement('p');
            p1.classList.add('tone-toggle__note-display', 'note-' + j);
            t.append(p1);

            // ADD BEAT DISPLAY ELEMENT
            let p2 = document.createElement('p');
            p2.classList.add(
                'tone-toggle__beat-display',
                'beatTone-' + j,
                'tone-toggle--inactive-display'
            );
            t.append(p2);

            // APPEND TO TOGGLE CONTAINER
            ttc.append(t); // add to parent div

            // INCREMENT INDEX COUNTER
            index++;
        }

        // ADD SET OF TONE TOGGLES TO MAIN ARRAY
        toneToggles.push(tmpArry);
    }

    // SET TOGGLE DIVS VARIABLE
    toneToggleDivs = document.getElementsByClassName('tone-toggle');
    toneToggleContainerDivs = document.getElementsByClassName('beat-container');
}

// UPDATE TOGGLE DIVS FOR NEW KEYS
function updateToggleTones() {
    // UPDATE TOGGLE NOTE AND NOTE DISPLAY TEXT BASED ON KEY
    for (let i = 0; i < numToggles; i++) {
        // ARRAY OF P ELEMENTS FOR EACH NOTE
        let notesDisplayArray = document.querySelectorAll('.note-' + i);
        let beatsDisplayArray = document.querySelectorAll('.beatTone-' + i);

        for (let j = 0; j < numBeats; j++) {
            // INDIVIDUAL TOGGLE
            let tt = toneToggles[j][i];

            // SET TOGGLE TONE AND NOTE
            tt.tone = tones[i];
            tt.note = notesDisplay[i];
            notesDisplayArray[j].innerHTML = notesDisplay[i];

            // SET TOGGLE BEAT
            tt.beat = i;
            tt.beatDisplay = beatFiles[i][1];
            beatsDisplayArray[j].innerHTML = beatFiles[i][1];

            // SET TOGGLE'S ACTIVE COLOR
            for (var h = 0; h < scaleColors.length; h++) {
                if (tt.note == scaleColors[h][0]) {
                    tt.toneColor = scaleColors[h][1];
                    // TOGGLE BACKGROUND ON IF TOGGLE IS ACTIVE
                    if (tt.activeTone) {
                        tt.setBackground();
                    }
                }
            }
        }
    }
}

// CREATE EACH TOGGLE GROUP'S RANDOM BUTTONS
function createRandomButtons() {
    for (let i = 0; i < toneToggleContainerDivs.length; i++) {
        // CREATE RANDOM BUTTON
        let b = document.createElement('button');
        b.id = i;
        b.classList.add('btn', 'btn--icon', 'btn--random-off', 'js-random-btn');
        b.name = 'random';
        b.value = 'off';
        b.setAttribute('aria-label', 'Toggle Randomness');
        // ADD TO PARENT CONTAINER DIV
        toneToggleContainerDivs[i].append(b);
    }
}

// REMOVE ACTIVE STATE OF ALL TONES
function clearTones() {
    for (let i = 0; i < numBeats; i++) {
        for (let j = 0; j < numToggles; j++) {
            let tt = toneToggles[i][j];
            if (tt.activeTone == true || tt.activeBeat == true) {
                tt.activeTone = false;
                tt.activeBeat = false;
                tt.setBackground();
            }
        }
    }
}

// TOGGLE BETWEEN BEATS AND TONES MODE
function updateToggleDisplays() {
    // DEFINE ALL P ELEMENTS
    let nD = document.querySelectorAll('.tone-toggle__note-display');
    let bD = document.querySelectorAll('.tone-toggle__beat-display');

    if (!beatsMode) {
        // TOGGLE DISPLAY ELEMENTS
        for (let i = 0; i < nD.length; i++) {
            nD[i].classList.add('tone-toggle--inactive-display');
            bD[i].classList.remove('tone-toggle--inactive-display');
        }
        // TOGGLE FLAG
        beatsMode = true;
    } else {
        // TOGGLE DISPLAY ELEMENTS
        for (let i = 0; i < nD.length; i++) {
            bD[i].classList.add('tone-toggle--inactive-display');
            nD[i].classList.remove('tone-toggle--inactive-display');
        }
        // TOGGLE FLAG
        beatsMode = false;
    }

    // UPDATE TONE TOGGLE BACKGROUND
    for (let i = 0; i < numBeats; i++) {
        for (let j = 0; j < numToggles; j++) {
            toneToggles[i][j].setBackground();
        }
    }
}

// FUNCTION TO TURN RANDOMNESS ON OR OFF
function randomizeToggle(id) {
    for (let i = 0; i < numToggles; i++) {
        let tt = toneToggles[id][i];

        if (tt.activeRandom) {
            tt.activeRandom = false;
        } else {
            // REMOVE ACTIVE STATE
            if (tt.activeTone) {
                tt.activeTone = false;
                if (!beatsMode) {
                    tt.setBackground();
                }
            }

            // SET RANDOM FLAG
            tt.activeRandom = true;
        }
    }
}

/************************************************
TOGGLE OBJECT
************************************************/

// TONE OBJECT
function ToneToggle(id, beat, row) {
    this.id = id; // UNIQUE TOGGLE IDE
    this.beatId = beat; // ID OF WHAT BEAT TOGGLE PLAYS ON

    // TONE STATES
    this.activeTone = false; // flag if tone is toggled
    this.tone = 0; // FREQUENCY TO PLAY
    this.note = 'null'; // note string to display on toggle
    this.toneColor = null; // color of active state

    // BEAT STATES
    this.activeBeat = false;
    this.beatDisplay; // beat string to display on toggle
    this.beat; // beat to play
    this.beatColor = '#3e3e42'; // beat's corresponding color

    // RANDOM STATES
    this.activeRandom = false;

    // ONBOARDING ANIMATION
    this.animate = function (waitTime) {
        this.activeTone = true;
        this.setBackground();
        this.activeTone = false;
        setTimeout(this.setBackground, waitTime);
    };

    // TOGGLE BETWEEN ON AND OFF STATES
    this.toggle = function () {
        if (!beatsMode) {
            if (this.activeTone) {
                this.activeTone = false;
            } else {
                this.activeTone = true;
                if (this.activeRandom) {
                    randomizeToggle(this.beatId);
                    updateRandomButtonStatus(this.beatId);
                }
            }
        } else {
            if (this.activeBeat) {
                this.activeBeat = false;
            } else {
                this.activeBeat = true;
            }
        }

        // SET BG STYLE PROPERTIES
        this.setBackground();
    };

    // TOGGLE BETWEEN BACKGROUND STYLES
    this.setBackground = function () {
        // CREATE BACKGROUND COLOR VARIABLES
        let s1, s2;

        // SET DISPLAY COLOR IF ACTIVE
        if (this.activeTone || this.activeBeat) {
            s2 = '#FFFFFF';
        } else {
            // s1 = s2 = null;
        }

        // TONES MODE BACKGROUND
        if (!beatsMode) {
            if (this.activeTone) {
                s1 = this.toneColor;
            } else {
                s1 = s2 = null;
            }
        }

        // BEATS MODE BACKGROUND
        if (beatsMode) {
            if (this.activeBeat) {
                s1 = this.beatColor;
            } else {
                s1 = s2 = null;
            }
        }

        // SET COLOR
        toneToggleDivs[id].style.backgroundColor = s1;
        toneToggleDivs[id].style.borderColor = s1;
        toneToggleDivs[id].style.color = s2;
    };

    // PLAY TONE
    this.play = function () {
        if (this.activeRandom) {
            let r = getRndInteger(0, 2);
            if (r < 1) {
                playOsc(this.tone);
                if (!beatsMode) {
                    this.animate(300);
                }
            }
        }

        if (this.activeTone || this.activeBeat) {
            // PLAY ACTIVE TONE
            if (this.activeTone) {
                // PLAY OSCILLATOR
                playOsc(this.tone);
            }

            // PLAY ACTIVE BEAT
            if (this.activeBeat) {
                initBeats(this.beat);
            }

            // EXPAND DIV
            this.expand();
            setTimeout(this.contract, delay / (numBeats * 2));
        }
    };

    // EXPAND AND CONTRACT TOGGLE
    this.expand = function () {
        var transfromString = 'scale(0.95)';
        toneToggleDivs[id].style.webkitTransform = transfromString;
        toneToggleDivs[id].style.MozTransform = transfromString;
        toneToggleDivs[id].style.msTransform = transfromString;
        toneToggleDivs[id].style.OTransform = transfromString;
        toneToggleDivs[id].style.transform = transfromString;
    };

    // Contract Tone Toggle
    this.contract = function () {
        var transfromString = 'scale(1)';
        toneToggleDivs[id].style.webkitTransform = transfromString;
        toneToggleDivs[id].style.MozTransform = transfromString;
        toneToggleDivs[id].style.msTransform = transfromString;
        toneToggleDivs[id].style.OTransform = transfromString;
        toneToggleDivs[id].style.transform = transfromString;
    };
}
