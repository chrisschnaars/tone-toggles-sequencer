const utils = {
    getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    sortNumber(a, b) {
        return a - b;
    },
};

export default utils;
