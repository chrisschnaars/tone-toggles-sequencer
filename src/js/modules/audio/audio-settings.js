import player from './player';
import toneToggleSettings from '../tone-toggles/tone-toggle-settings';
import keySettings from './key-settings';
import intervalSettings from './interval-settings';
import scaleSettings from './scale-settings';
import colorSettings from './color-settings';
import utils from '../utils';

const audioSettings = {
    key: null,
    keyIndex: null,

    setup() {
        this.keySelection();
        this.noteSelection();
        player.setupPlayer();
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
        player.tones = [];
        toneToggleSettings.toneDisplays = [];

        // Randomly select intervals from array
        const toneSelection = this.setRandomToneArray();

        // Create display text and color for each note
        toneSelection.forEach((item, index) => {
            // Add selected tones to player
            // Need to multiply interval by selected key
            player.tones.push(intervalSettings[index] * this.key);

            // Set display text and color for selected notes
            const noteText = scaleSettings[this.keyIndex][index];
            const noteColor = this.getNoteColor(noteText);

            const displayItem = {
                note: noteText,
                color: noteColor,
            };

            toneToggleSettings.toneDisplays.push(displayItem);
        });
    },

    setRandomToneArray() {
        let selection = [];
        while (selection.length < toneToggleSettings.numberofTogglesPerRow - 1) {
            const r = utils.getRandomInteger(1, intervalSettings.length - 1);

            if (selection.indexOf(r) === -1) {
                selection.push(r);
            }
        }

        // Add root interval and sort intervals
        selection.push(0);
        selection.sort(utils.sortNumber);

        return selection;
    },

    getNoteColor(note) {
        for (let i = 0; i < colorSettings.length; i++) {
            if (note === colorSettings[i][0]) {
                return colorSettings[i][1];
            }
        }
    },
};

export default audioSettings;
