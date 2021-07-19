const RiggedDie = require('gamblers-dice')

export const getNewDieInstance = (max: number = 10) => {
    return new RiggedDie(max);
}

export const riggedRoll = <T>(riggedDie: any, possibleOptions: Array<T>) => {
    var rollResult = riggedDie.roll();
    return possibleOptions[rollResult - 1];
}

export const seededRandom = (max: number, seed: number = 1) => {
    var x = Math.sin(seed++) * 10000;
    return (x - Math.floor(x)) * max;
}