import ToneToggle from './tone-toggle';
import controlBar from '../control-bar/control-bar';
import player from '../audio/player';
import colorSettings from '../audio/color-settings';
import randomButtonIcon from './random-button.js';
import utils from '../utils';

const toneToggleSettings = {
    numberOfBeats: 8,
    numberofTogglesPerRow: 5,
    toneToggles: [],
    beatMode: false,
    toneDisplays: [],
    beatDisplays: ['Kick', 'Snare', 'Hat', 'Clap', 'Tom'],
    timerIds: [[], [], [], [], [], [], [], []],
    animationDelay: 0,
    intervalDelay: 0,

    setupToneToggles() {
        this.createToggleObjects();
        this.setupToggleInteraction();
        this.createRandomButtons();
        this.setupRandomButtonInteraction();
        this.updateToggleDisplays();
        this.setAnimationDelay();
        this.animateToggles();
    },

    createToggleObjects() {
        let index = 0;

        // Create a beat container for each row
        for (let i = 0; i < this.numberOfBeats; i++) {
            const beatContainer = document.createElement('div');
            beatContainer.classList.add('tone-toggles__beat-container');

            const beatContainerParent = document.querySelector('.tone-toggles__container');
            beatContainerParent.append(beatContainer);

            // Create a tone toggle for each beat in each row
            for (let j = 0; j < this.numberofTogglesPerRow; j++) {
                // Create toggle DOM element
                const tt = document.createElement('div');
                tt.id = index;
                tt.classList.add('tone-toggles__toggle', `beat-${i}`);
                tt.setAttribute('tabindex', '0');

                // Create object
                this.toneToggles[index] = new ToneToggle(index, i, j, tt);

                // Add note/beat display
                const noteDisplay = document.createElement('p');
                noteDisplay.classList.add('tone-toggles__display');
                tt.append(noteDisplay);

                // Add tone toggle to beat container
                beatContainer.append(tt);

                index++;
            }
        }
    },

    setupToggleInteraction() {
        const toggleContainer = document.querySelector('.tone-toggles');
        toggleContainer.addEventListener('click', function (e) {
            if (e.target.className.includes('tone-toggles__toggle')) {
                toneToggleSettings.toneToggles[e.target.id].toggle();
            }
        });

        const toggles = document.querySelectorAll('.tone-toggles__toggle');
        toggles.forEach((item, index) => {
            item.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    toneToggleSettings.toneToggles[index].toggle();
                }
            });
        });
    },

    createRandomButtons() {
        const beatContainers = document.querySelectorAll('.tone-toggles__beat-container');
        beatContainers.forEach((item, index) => {
            const randomButton = document.createElement('button');
            randomButton.id = index;
            randomButton.classList.add('btn', 'btn--round', 'random-btn', 'js-random-btn');
            randomButton.innerHTML = randomButtonIcon;
            item.append(randomButton);
        });
    },

    setupRandomButtonInteraction() {
        const randomButtons = document.querySelectorAll('.js-random-btn');
        randomButtons.forEach((button) => {
            button.addEventListener(
                'click',
                function (e) {
                    this.classList.toggle('random-btn--active');
                    toneToggleSettings.toggleRandomMode(e.target.id);
                    e.target.blur();
                },
                false
            );
        });
    },

    animateToggles() {
        this.toneToggles.forEach((item) => {
            const delay1 = 200 + item.row * 80 + item.beat * 80;
            const delay2 = 360;
            setTimeout(function () {
                item.toggleColors(true, item.toneColor);
                setTimeout(function () {
                    item.toggleColors();
                }, delay2);
            }, delay1);
        });
    },

    updateToggleDisplays() {
        this.setToggleText();
        this.setToggleColor();
    },

    setToggleText() {
        const displays = document.querySelectorAll('.tone-toggles__display');

        this.toneToggles.forEach((item, index) => {
            const row = item.row;

            // Update display text
            const displayText = this.beatMode
                ? this.beatDisplays[row]
                : this.toneDisplays[row].note;
            displays[index].innerHTML = displayText;
        });
    },

    // Set active color for tones
    setToggleColor() {
        this.toneToggles.forEach((item) => {
            const row = item.row;
            // Update display color
            item.toneColor = this.toneDisplays[row].color;

            if (!this.beatMode) {
                item.toggleColors(item.activeTone, item.toneColor);
            }
        });
    },

    toggleRandomMode(beatId) {
        // Switch to beat mode
        if (this.beatMode) {
            this.toggleModes();
            controlBar.updateSoundBankToggleState();
        }

        if (this.timerIds[beatId].length === 0) {
            // Start random selection loop
            let timerId = setTimeout(function randomize() {
                toneToggleSettings.selectRandomTones(beatId);
                timerId = setTimeout(randomize, toneToggleSettings.intervalDelay);
                toneToggleSettings.timerIds[beatId] = timerId;
            }, 0);
        } else {
            // Stop random selection loop
            clearTimeout(this.timerIds[beatId]);
            this.timerIds[beatId] = [];
        }
    },

    selectRandomTones(beatId) {
        if (player.playing) {
            // Randomly choose a number of tones to play
            const numTones = utils.getRandomInteger(1, 2);

            // For each tone, randomly choose which toggle to activate
            const toneArray = [];
            while (toneArray.length < numTones) {
                const toneIndex = utils.getRandomInteger(0, 4);
                if (toneArray.indexOf(toneIndex) === -1) {
                    toneArray.push(toneIndex);
                }
            }

            // Update active states for randomized tones
            toneToggleSettings.toneToggles.forEach((item) => {
                if (item.beat.toString() === beatId) {
                    if (item.activeTone) {
                        item.toggleActiveTone(toneToggleSettings.beatMode);
                    }

                    toneArray.forEach((id) => {
                        if (item.row === id) {
                            item.toggleActiveTone(toneToggleSettings.beatMode);
                        }
                    });
                }
            });
        }
    },

    toggleModes() {
        this.beatMode = !this.beatMode;

        // Update Note Displays
        this.setToggleText();

        // Update Note Colors
        this.toneToggles.forEach((item) => {
            const state = this.beatMode ? item.activeBeat : item.activeTone;
            const color = this.beatMode ? item.beatColor : item.toneColor;
            item.toggleColors(state, color);
            item.toggleActiveClass();
        });
    },

    getActiveColor(note) {
        for (let i = 0; i < colorSettings.length; i++) {
            if (note === colorSettings[i][0]) {
                return colorSettings[i][1];
            }
        }
    },

    clearTones() {
        this.toneToggles.forEach((item) => {
            item.activeTone = false;
            item.activeBeat = false;
            item.toggleColors();
        });
    },

    // Calcuates the length of 1 beat
    setAnimationDelay(bpm = 120) {
        this.animationDelay = utils.calcDelay(bpm);
        this.intervalDelay = this.animationDelay * this.numberofTogglesPerRow;
    },
};

export default toneToggleSettings;
