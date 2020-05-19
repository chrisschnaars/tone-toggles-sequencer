import toneToggleSettings from './modules/tone-toggle-settings';
import setupInteraction from './modules/interaction';

window.onload = () => {
    toneToggleSettings.setupToneToggles();
    setupInteraction();
};
