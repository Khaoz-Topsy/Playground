export const currentShortTime = (now: Date = new Date()) => {
    const date = now.getHours() + ':' + padZeros(now.getMinutes().toString());
    return date;
}

export const currentMediumTime = (now: Date = new Date()) => {
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    return `${padZeros(hours.toString())}:${padZeros(minutes.toString())}:${padZeros(seconds.toString())}`
}

export const currentShortDate = (now: Date = new Date()) => {
    const date = now.getFullYear() + '-' + padZeros((now.getMonth() + 1).toString()) + '-' + padZeros(now.getDate().toString());
    return date;
}

export const currentMediumDate = (now: Date = new Date(), lang: string = 'en') => {
    const monthText = (new Intl.DateTimeFormat(lang, { month: 'long' }).format(now));
    return `${padZeros(now.getDate().toString())} ${monthText}, ${now.getFullYear()}`;
}

export const getIntlWeekdayText = (now: Date = new Date(), lang: string = 'en') => {
    return (new Intl.DateTimeFormat(lang, { weekday: 'long' }).format(now));
}

export const addDays = (date: Date, days: number) => {
    date.setDate(date.getDate() + days);
    return date;
}

export const get24HourLocalTimeFromUtcHour = (utcHour: number) => {
    const dateString = `2021-07-12T${padZeros(utcHour.toString())}:${(utcHour % 1) > 0 ? '30' : '00'}:00Z`;
    const date = new Date(dateString);
    return currentShortTime(date);
}

export const getDateMilli = (additional = '') => {
    return (new Date()).getTime().toString() + additional;
}

// export const isLeapYear = (now: Date = new Date()) => {
//     const year = now.getFullYear();
//     if ((year & 3) !== 0) return false;
//     return ((year % 100) !== 0 || (year % 400) === 0);
// };

// export const getDayOfTheYear = (now: Date = new Date()) => {
//     const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
//     const mn = now.getMonth();
//     const dn = now.getDate();
//     let dayOfYear = dayCount[mn] + dn;
//     if (mn > 1 && isLeapYear(now)) dayOfYear++;
//     return dayOfYear;
// }

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