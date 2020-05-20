import toneToggleSettings from './modules/tone-toggle-settings';
import audioSettings from './modules/audio-settings';
import setupInteraction from './modules/interaction';

window.onload = () => {
    audioSettings.setup();
    toneToggleSettings.setupToneToggles();
    setupInteraction();
};
