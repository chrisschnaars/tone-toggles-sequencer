import toneToggleSettings from './tone-toggle-settings';

class ToneToggle {
    constructor(id, beat, row) {
        this.id = id;
        this.beat = beat;
        this.row = row;
        this.color = null;
        this.activeTone = false;
        this.tone = 0;
        this.toneDisplay = 'Tone';
        this.activeBeat = false;
        this.beat = 0;
        this.beatDisplay = 'Beat';
        this.randomState = false;
    }

    toggle() {
        if (!toneToggleSettings.beatMode) {
            this.activeTone = this.activeTone ? !this.activeTone : this.activeTone;
        } else {
            this.activeTone = this.activeBeat ? !this.activeBeat : this.activeBeat;
        }
    }
}

export default ToneToggle;
