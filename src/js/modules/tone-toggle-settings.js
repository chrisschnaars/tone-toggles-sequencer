import ToneToggle from './tone-toggle';

const toneToggleSettings = {
    numberOfBeats: 8,
    numberofTogglesPerRow: 5,
    toneToggles: [],
    beatMode: false,

    setupToneToggles() {
        this.createToggleObjects();
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
                this.toneToggles[index] = new ToneToggle(index, i, j);

                // Create toggle DOM element
                const tt = document.createElement('div');
                tt.id = index;
                tt.classList.add('tone-toggles__toggle', `beat-${i}`);

                // Add note display
                const noteDisplay = document.createElement('p');
                noteDisplay.classList.add('tone-toggles__display', `note-${j}`);
                noteDisplay.innerHTML = 'tone';
                tt.append(noteDisplay);

                // Add beat display
                const beatDisplay = document.createElement('p');
                beatDisplay.classList.add('tone-toggles__display', `beatTone-${j}`);
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
};

export default toneToggleSettings;
