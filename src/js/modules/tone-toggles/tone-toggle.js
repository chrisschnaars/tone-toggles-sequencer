import toneToggleSettings from './tone-toggle-settings';
import player from '../audio/player';

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
        this.activeBeat = false;
    }

    toggle() {
        // if beats mode, toggle beat
        if (toneToggleSettings.beatMode) {
            this.toggleActiveBeat();
        } else {
            this.toggleActiveTone();
        }
    }

    toggleActiveTone(beatState = false) {
        // Flip active state
        this.activeTone = !this.activeTone;

        // Toggle audio
        this.toggleAudio(false, this.activeTone);

        // Toggle visual state if in tone mode
        if (!beatState) {
            this.toggleActiveClass();
            this.toggleColors(this.activeTone, this.toneColor);
        }
    }

    toggleActiveBeat(beatState = true) {
        // Toggle state
        this.activeBeat = !this.activeBeat;

        // Toggle audio
        this.toggleAudio(true, this.activeBeat);

        // Toggle visual state if in tone mode
        if (beatState) {
            this.toggleActiveClass();
            this.toggleColors(this.activeBeat, this.beatColor);
        }
    }

    toggleActiveClass() {
        const activeClass = 'tone-toggles__toggle--active';
        const beatMode = toneToggleSettings.beatMode;

        if ((beatMode && this.activeBeat) || (!beatMode && this.activeTone)) {
            this.toggleDiv.classList.add(activeClass);
        } else {
            this.toggleDiv.classList.remove(activeClass);
        }
    }

    toggleColors(activeState = false, activeColor = null) {
        const c1 = activeState ? activeColor : null;
        const c2 = activeState ? this.textColor : null;

        this.toggleDiv.style.backgroundColor = c1;
        this.toggleDiv.style.borderColor = c1;
        this.toggleDiv.style.color = c2;
    }

    toggleAudio(beatState, activeState) {
        const selectedNote = beatState
            ? toneToggleSettings.beatDisplays[this.row]
            : player.tones[this.row];

        const audioArray = beatState
            ? player.activeBeats[this.beat]
            : player.activeTones[this.beat];

        if (activeState) {
            audioArray.push(selectedNote);
        } else {
            const index = audioArray.indexOf(selectedNote);
            audioArray.splice(index, 1);
        }
    }
}

export default ToneToggle;
