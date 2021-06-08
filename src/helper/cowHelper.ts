const cowsay = require('cowsay-browser');

export const cowMessageAsArray = (text?: string) => {
    const cowArray: Array<string> = cowsay.say({ text }).split(/\r?\n/);
    return cowArray.map(c => {
        return c.replaceAll(/\s/g, '⠀');
    });
}