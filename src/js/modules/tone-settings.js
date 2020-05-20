/************************************************
TONE LIRBARY
************************************************/

// ROOT FREQUENCY FOR KEYS
const keyFrequencies = [110, 130.81, 146.83, 164.81, 98.0];
const keyRootNotes = ['A', 'C', 'D', 'E', 'G']; // displa note for each freq

// INTERVAL FOR EACH NOTE OF VARIOUS SCALE
const prime = 1;
const minorSecond = 12 / 11;
const second = 9 / 8;
const minorThird = 6 / 5;
const third = 5 / 4;
const fourth = 4 / 3;
const tritone = 7 / 5;
const fifth = 3 / 2;
const minorSixth = 8 / 5;
const sixth = 5 / 3;
const seventh = 15 / 8;
const harmonicSeventh = 7 / 4;
const minorSeventh = 9 / 5;

// ARRAY OF INTERVALS FOR SELECTION
const scaleIntervals = [
    prime,
    minorThird,
    third,
    fourth,
    fifth,
    sixth,
    harmonicSeventh,
    prime * 2,
    minorThird * 2,
    third * 2,
    fourth * 2,
    fifth * 2,
    sixth * 2,
    harmonicSeventh * 2,
    prime * 3,
];

// CHROMATIC SCALE
const chromaticScale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// ARRAY OF NOTES FOR EACH KEY
// USED TO SET NOTE DISPLAY UI
const scaleNotes = [
    [
        'A',
        'C',
        'C&#9839;',
        'D',
        'E',
        'F&#9839;',
        'G&#9839;',
        'A',
        'C',
        'C&#9839;',
        'D',
        'E',
        'F&#9839;',
        'G&#9839;',
        'A',
    ],
    ['C', 'E&#9837;', 'E', 'F', 'G', 'A', 'B', 'C', 'E&#9837;', 'E', 'F', 'G', 'A', 'B', 'C'],
    [
        'D',
        'F',
        'F&#9839;',
        'G',
        'A',
        'B',
        'C&#9839;',
        'D',
        'F',
        'F&#9839;',
        'G',
        'A',
        'B',
        'C&#9839;',
        'D',
    ],
    [
        'E',
        'G',
        'G&#9839;',
        'A',
        'B',
        'C&#9839;',
        'D&#9839;',
        'E',
        'G',
        'G&#9839;',
        'A',
        'B',
        'C&#9839;',
        'D&#9839;',
        'E',
    ],
    [
        'G',
        'B&#9837;',
        'B',
        'C',
        'D',
        'E',
        'F&#9839;',
        'G',
        'B&#9837;',
        'B',
        'C',
        'D',
        'E',
        'F&#9839;',
        'G',
    ],
];

// LIRBRARY OF COLORS FOR EACH NOTE COLOR OF EACH NOTE
const scaleColors = [
    ['A', '#DC312E'],
    ['A&#9839;', '#E3682F'],
    ['B&#9837;', '#E3682F'],
    ['B', '#E6822C'],
    ['B&#9839;', '#F5CC00'],
    ['C', '#F5CC00'],
    ['C&#9839;', '#39E14F'],
    ['D', '#19CC67'],
    ['D&#9839;', '#1FDBCC'],
    ['E&#9837;', '#1FDBCC'],
    ['E', '#10A3D4'],
    ['F', '#6700FF'],
    ['F&#9839;', '#A620D2'],
    ['G', '#CB1DCB'],
    ['G&#9839;', '#D92170'],
];
