import toneToggleSettings from './tone-toggle-settings.js';
import keySettings from './key-settings';
import intervalSettings from './interval-settings';
import scaleSettings from './scale-settings';
import utils from './utils';

const audioSettings = {
    key: null,
    keyIndex: null,
    toneValues: [],
    toneDisplays: [],

    setup() {
        this.keySelection();
        this.noteSelection();
    },

    keySelection() {
        // Selet a random key
        this.keyIndex = utils.getRandomInteger(0, keySettings.length - 1);

        // Randomly determine key octave
        const octCoeff = utils.getRandomInteger(0, 2);
        const octaveDivider = octCoeff < 1 ? 1 : 2;

        // Set Key
        this.key = keySettings[this.keyIndex].frequency / octaveDivider;
    },

    noteSelection() {
        // Clear existing array
        this.toneValues = [];
        this.toneDisplays = [];

        // Randomly select id for each tone
        let selection = [];
        while (selection.length < toneToggleSettings.numberofTogglesPerRow - 1) {
            const r = utils.getRandomInteger(1, intervalSettings.length - 1);

            if (selection.indexOf(r) === -1) {
                selection.push(r);
            }
        }

        // Add root and sort intervals
        selection.push(0);
        selection.sort(utils.sortNumber);

        // Set tones and note display based on selection id
        for (let i = 0; i < selection.length; i++) {
            const id = selection[i];
            this.toneValues.push(intervalSettings[id]);
            this.toneDisplays.push(scaleSettings[this.keyIndex][id]);
        }
    },
};

export default audioSettings;
