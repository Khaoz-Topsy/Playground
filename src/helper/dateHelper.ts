
export const currentShortTime = () => {
    const today = new Date();
    const date = today.getHours() + ':' + padZeros(today.getMinutes().toString());
    return date;
}
export const currentShortDate = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + padZeros((today.getMonth() + 1).toString()) + '-' + padZeros(today.getDate().toString());
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