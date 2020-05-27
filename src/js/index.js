import toneToggleSettings from './modules/tone-toggles/tone-toggle-settings';
import audioSettings from './modules/audio/audio-settings';
import controlBar from './modules/control-bar/control-bar.js';
import setupAboutModal from './modules/about-modal/about-modal.js';

window.onload = () => {
    audioSettings.setup();
    toneToggleSettings.setupToneToggles();
    controlBar.init();
    setupAboutModal();

    // Trigger keyboard user focus state
    document.addEventListener(
        'keydown',
        function (e) {
            // Tabbing
            if (e.key === 'Tab') {
                // the "I am a keyboard user" key
                document.body.classList.add('user-is-tabbing');
            }
        },
        false
    );
};
