import toneToggleSettings from './tone-toggle-settings';
import audioSettings from './audio-settings';

function setupInteraction() {
    // Tone toggle click event
    const toggles = document.querySelector('.tone-toggles');
    toggles.addEventListener('click', function (e) {
        if (e.target.className.includes('tone-toggles__toggle')) {
            toneToggleSettings.toneToggles[e.target.id].toggle();
        }
    });

    // Refrsh notes
    document.querySelector('.js-refresh-btn').addEventListener(
        'click',
        function (e) {
            audioSettings.setup();
            toneToggleSettings.updateToggleNotes();
            e.target.blur();
        },
        false
    );

    // Clear tones
    document.querySelector('.js-clear-btn').addEventListener(
        'click',
        function (e) {
            toneToggleSettings.clearTones();
            e.target.blur();
        },
        false
    );

    // Open About Modal
    document.querySelector('.js-about-open').addEventListener(
        'click',
        function () {
            document.querySelector('.about').classList.toggle('about--visible');
        },
        false
    );

    // Close about modal
    document.querySelector('.js-about-close').addEventListener(
        'click',
        function () {
            document.querySelector('.about').classList.toggle('about--visible');
        },
        false
    );
}

export default setupInteraction;

//     // TONE TOGGLE KEYBOARD EVENTS
//     document.addEventListener(
//         'keydown',
//         function (e) {
//             // TABBING
//             if (e.key === 'Tab') {
//                 // the "I am a keyboard user" key
//                 document.body.classList.add('user-is-tabbing');
//             }
//
//             // MUTE/UNMUTE
//             if (e.key === ' ') {
//                 updatePlaying();
//             }
//         },
//         false
//     );
//
//     // RANDOM BUTTONS
//     let rb = document.querySelectorAll('.js-random-btn');
//     for (let i = 0; i < rb.length; i++) {
//         rb[i].addEventListener(
//             'click',
//             function (e) {
//                 e.preventDefault();
//                 e.target.blur();
//                 randomizeToggle(e.target.id);
//                 toggleRandomButtonState(e.target.id);
//             },
//             false
//         );
//     }
//
//     // PLAY/PAUSE BUTTON
//     document.querySelector('.js-play-toggle').addEventListener(
//         'click',
//         function (e) {
//             updatePlaying();
//             e.target.blur();
//         },
//         false
//     );
//
//     // SOUND SELECTOR
//     document.querySelector('.js-sound-bank-toggle').addEventListener(
//         'click',
//         function (e) {
//             let s = e.target.value;
//             if ((s == 'tones' && beatsMode) || (s == 'beats' && !beatsMode)) {
//                 updateToggleDisplays();
//                 updateToggleStatus(e);
//             }
//         },
//         false
//     );
//
//     // MOBILE SOUND SELECTOR
//     let ssm = document.querySelector('.js-sound-bank-toggle-mini');
//     ssm.addEventListener(
//         'click',
//         function (e) {
//             updateToggleDisplays();
//             if (!beatsMode) {
//                 ssm.innerHTML = 'Tones';
//             } else {
//                 ssm.innerHTML = 'Beats';
//             }
//             e.target.blur();
//         },
//         false
//     );
//
//     // TEMPO SLIDER
//     tempoControl.addEventListener(
//         'input',
//         function () {
//             bpm = Number(this.value);
//             document.querySelector('.js-tempo-readout').innerHTML = this.value;
//             tempoControl.setAttribute('aria-valuenow', bpm);
//             tempoControl.setAttribute('value', bpm);
//             calcDelay();
//         },
//         false
//     );
//
// REFRESH BUTTON

// }
//
// /************************************************
// TOGGLE GROUP UPDATES
// ************************************************/
//
// // UPDATE TOGGLE BUTTON GROUP FOR ACTIVE SELECTION
// function updateToggleStatus(e) {
//     // REMOVE SELECTED CLASS FROM ALL TOGGLES
//     var toggles = document.querySelectorAll('.btn--toggle');
//     for (var i = 0; i < toggles.length; i++) {
//         toggles[i].classList.remove('btn--toggle-selected');
//     }
//
//     // ADD SELECTED CLASS TO SELECTED
//     e.target.classList.add('btn--toggle-selected');
// }
//
// // TOGGLE RANDOM BUTTON STATE
// function toggleRandomButtonState(id) {
//     // GET ALL RANDOM BUTTONS
//     let randomButtons = document.querySelectorAll('.js-random-btn');
//
//     // UPDATE CLICKED RANDOM BUTTON
//     let r = randomButtons[id];
//     if (r.value == 'off') {
//         r.classList.remove('btn--random-off');
//         r.classList.add('btn--random-on');
//         r.classList.add('btn--toggle-selected');
//         r.value = 'on';
//     } else {
//         r.classList.remove('btn--random-on');
//         r.classList.remove('btn--toggle-selected');
//         r.classList.add('btn--random-off');
//         r.value = 'off';
//     }
// }
