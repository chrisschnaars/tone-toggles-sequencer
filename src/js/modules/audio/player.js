import * as Tone from 'tone';
import toneToggleSettings from '../tone-toggles/tone-toggle-settings';
import utils from '../utils';
import kickURL from '../../../assets/sounds/kick.WAV';
import snareURL from '../../../assets/sounds/snare.WAV';
import hatURL from '../../../assets/sounds/hat.WAV';
import clapURL from '../../../assets/sounds/clap.WAV';
import tomURL from '../../../assets/sounds/tom.WAV';

const player = {
    tones: [], // array of randomly selected tones
    synth: new Tone.PolySynth(4, Tone.SimpleSynth, {
        volume: 0,
        oscillator: {
            type: 'triangle',
        },
        envelope: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0.2,
            release: 2.5,
        },
    }).toMaster(),
    activeTones: [[], [], [], [], [], [], [], []],
    activeBeats: [[], [], [], [], [], [], [], []],
    beatPlayers: null,
    playing: false,
    sequence: null,
    bpm: 120,

    setupPlayer() {
        this.setupBeats();
        this.setupSequence();
        this.setTempo(this.bpm);
    },

    setupSequence() {
        this.sequence = new Tone.Sequence(
            function (time, i) {
                // Play each tone
                player.activeTones[i].forEach((item) => {
                    player.synth.triggerAttackRelease(item, 0.125);
                });

                // Play each beat
                player.activeBeats[i].forEach((item) => {
                    player.beatPlayers.get(item).start();
                });

                // Animate active beat row
                Tone.Draw.schedule(function () {
                    const activeBeat = document.querySelectorAll('.tone-toggles__beat-container')[
                        i
                    ];
                    activeBeat.classList.add('tone-toggles__beat-container--active');
                    setTimeout(() => {
                        activeBeat.classList.remove('tone-toggles__beat-container--active');
                    }, toneToggleSettings.animationDelay / 2);
                }, time);
            },
            [0, 1, 2, 3, 4, 5, 6, 7],
            '4n'
        ).start(0);
    },

    setupBeats() {
        this.beatPlayers = new Tone.Players(
            {
                Kick: kickURL,
                Snare: snareURL,
                Hat: hatURL,
                Clap: clapURL,
                Tom: tomURL,
            },
            {
                volume: -8,
                fadeOut: '64n',
            }
        ).toMaster();
    },

    togglePlaying() {
        Tone.Transport.toggle();
        document.querySelector('.js-play-toggle').classList.toggle('play-btn--active');
        this.playing = !this.playing;
    },

    setTempo(value) {
        Tone.Transport.bpm.value = value;

        if (value !== this.bpm) {
            this.bpm = value;
        }
    },

    refreshActiveTones() {
        this.resetActiveTones();
        this.sequence.removeAll();

        for (let i = 0; i < toneToggleSettings.toneToggles.length; i++) {
            const tt = toneToggleSettings.toneToggles[i];

            if (tt.activeTone) {
                player.activeTones[tt.beat].push(this.tones[tt.row]);
            }
        }
    },

    resetDefaultState() {
        this.resetActiveTones();
        this.resetActiveBeats();
    },

    resetActiveTones() {
        this.activeTones = [[], [], [], [], [], [], [], []];
    },

    resetActiveBeats() {
        this.activeBeats = [[], [], [], [], [], [], [], []];
    },

    selectRandomTones() {
        const n = utils.getRandomInteger(0, this.tones.length - 1);
        player.synth.triggerAttackRelease(this.tones[n], 0.25);
    },
};

export default player;
