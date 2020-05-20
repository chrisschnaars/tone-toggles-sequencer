import ToneToggle from './tone-toggle';
import audioSettings from './audio-settings';
import colorSettings from './color-settings';

const toneToggleSettings = {
    numberOfBeats: 8,
    numberofTogglesPerRow: 5,
    toneToggles: [],
    beatMode: false,

    setupToneToggles() {
        this.createToggleObjects();
        this.updateToggleNotes();
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

                // Create object
                this.toneToggles[index] = new ToneToggle(index, i, j, tt);

                // Add note display
                const noteDisplay = document.createElement('p');
                noteDisplay.classList.add('tone-toggles__display', 'js-note-display');
                noteDisplay.innerHTML = 'tone';
                tt.append(noteDisplay);

                // Add beat display
                const beatDisplay = document.createElement('p');
                beatDisplay.classList.add('tone-toggles__display', 'js-beat-display');
                tt.append(beatDisplay);

                // Add tone toggle to beat container
                beatContainer.append(tt);

                index++;
            }

            // Create a randomize button
            this.createRandomButton(i, beatContainer);
        }
    },

    createRandomButton(beatId, parentDiv) {
        let randomButton = document.createElement('button');
        randomButton.id = beatId;
        randomButton.classList.add('btn', 'js-random-btn');
        randomButton.innerText = 'Randomize';
        parentDiv.append(randomButton);
    },

    updateToggleNotes() {
        // Update note displays in each toggle
        const noteDisplays = document.querySelectorAll('.js-note-display');

        for (let i = 0; i < this.toneToggles.length; i++) {
            const tt = this.toneToggles[i];

            noteDisplays[i].innerHTML = audioSettings.toneDisplays[tt.row];
            tt.tone = audioSettings.toneValues[tt.row];
            tt.toneColor = this.setToggleColor(audioSettings.toneDisplays[tt.row]);
            tt.toggleColors();
        }
    },

    setToggleColor(note) {
        for (let i = 0; i < colorSettings.length; i++) {
            if (note === colorSettings[i][0]) {
                return colorSettings[i][1];
            }
        }
    },

    clearTones() {
        for (let i = 0; i < this.toneToggles.length; i++) {
            let tt = this.toneToggles[i];

            tt.activeTone = false;
            tt.activeBeat = false;
            tt.toggleColors();
        }
    },
};

export default toneToggleSettings;
