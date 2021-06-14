export const currentShortTime = () => {
    const today = new Date();
    const date = today.getHours() + ':' + padZeros(today.getMinutes().toString());
    return date;
}

export const currentMediumTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${hours}${minutes < 10 ? ':0' : ':'}${minutes}${seconds < 10 ? ':0' : ':'}${seconds}`
}

export const currentShortDate = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + padZeros((today.getMonth() + 1).toString()) + '-' + padZeros(today.getDate().toString());
    return date;
}

export const addDays = (date: Date, days: number) => {
    date.setDate(date.getDate() + days);
    return date;
}

const padZeros = (numString: string, expectedLength: number = 2) => {
    let result = [];
    for (const numStr of numString.split('').reverse()) {
        result.push(numStr);
    }
    for (let zeroIndex = 0; zeroIndex < (expectedLength - result.length); zeroIndex++) {
        result.push('0');
    }
    return result.reverse().join('');
}