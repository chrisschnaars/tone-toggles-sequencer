import toneToggleSettings from '../tone-toggles/tone-toggle-settings';
import audioSettings from '../audio/audio-settings';
import player from '../audio/player.js';

const controlBar = {
    init() {
        this.setupPlayButton();
        this.setupSoundBankToggles();
        this.setupTempoControl();
        this.setupRefreshButton();
        this.setupClearTonesButton();
    },

    setupPlayButton() {
        //  click event
        document.querySelector('.js-play-toggle').addEventListener(
            'click',
            function () {
                player.togglePlaying();
            },
            false
        );

        // spacebar
        document.addEventListener(
            'keydown',
            function (e) {
                if (e.key === ' ') {
                    player.togglePlaying();
                }
            },
            false
        );
    },

    setupSoundBankToggles() {
        const soundBankToggles = document.querySelectorAll('.js-sound-bank-toggle');

        soundBankToggles.forEach((item) => {
            item.addEventListener(
                'click',
                function (e) {
                    const buttonValue = e.target.value === 'tones' ? false : true;

                    // Only do something if user pressed inactive toggle
                    if (buttonValue !== toneToggleSettings.beatMode) {
                        toneToggleSettings.toggleModes();
                        controlBar.updateSoundBankToggleState();
                    }
                },
                false
            );
        });
    },

    updateSoundBankToggleState() {
        // Update large screen toggles
        const toggleButtons = document.querySelectorAll('.js-sound-bank-toggle-btn');
        toggleButtons.forEach((item) => {
            item.classList.toggle('btn--toggle-selected');
        });

        // Update mini toggle
        const toggleButtonMini = document.querySelector('.js-sound-bank-toggle-mini');
        const buttonText = toneToggleSettings.beatMode ? 'Tones' : 'Beats';
        toggleButtonMini.innerText = buttonText;
        toggleButtonMini.setAttribute('value', buttonText.toLowerCase());
    },

    setupTempoControl() {
        document.querySelector('.js-tempo-control').addEventListener(
            'input',
            function () {
                player.setTempo(this.value);
                toneToggleSettings.setAnimationDelay(this.value);
                document.querySelector('.js-tempo-readout').innerHTML = this.value;
                this.setAttribute('aria-valuenow', this.value);
                this.setAttribute('value', this.value);
            },
            false
        );
    },

    setupRefreshButton() {
        document.querySelector('.js-refresh-btn').addEventListener(
            'click',
            function () {
                audioSettings.setup();
                toneToggleSettings.updateToggleDisplays();
                player.refreshActiveTones();
            },
            false
        );
    },

    setupClearTonesButton() {
        document.querySelector('.js-clear-btn').addEventListener(
            'click',
            function () {
                toneToggleSettings.clearTones();
                player.resetDefaultState();

                if (player.playing) {
                    player.togglePlaying();
                }
            },
            false
        );
    },
};

export default controlBar;
