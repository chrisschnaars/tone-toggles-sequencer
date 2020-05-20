import toneToggleSettings from './tone-toggle-settings';

class ToneToggle {
    constructor(id, beat, row, div) {
        this.id = id;
        this.beat = beat;
        this.row = row;
        this.toggleDiv = div;
        this.toneColor = null;
        this.beatColor = '#3e3e42';
        this.textColor = '#fff';
        this.activeTone = false;
        this.tone = 0;
        this.activeBeat = false;
        this.beatTone = 0;
        this.randomState = false;
    }

    toggle() {
        // Toggle state
        if (!toneToggleSettings.beatMode) {
            this.activeTone = !this.activeTone;
        } else {
            this.activeBeat = !this.activeBeat;
        }

        // Change color state
        this.toggleColors();
    }

    toggleColors() {
        // Set to default state
        let c1 = null;
        let c2 = null;

        // Update if toggle is active
        if (toneToggleSettings.beatMode && this.activeBeat) {
            c1 = this.beatColor;
            c2 = this.textColor;
        } else if (!toneToggleSettings.beatMode && this.activeTone) {
            c1 = this.toneColor;
            c2 = this.textColor;
        }

        // Set colors
        this.toggleDiv.style.backgroundColor = c1;
        this.toggleDiv.style.borderColor = c1;
        this.toggleDiv.style.color = c2;
    }
}

export default ToneToggle;
