export const sortAlphabeticallyByProp = <T>(arr: Array<T>, attr: string): Array<T> => {
    return arr.sort((a: T, b: T) => {
        if ((a as any)[attr] < (b as any)[attr]) { return -1; }
        if ((a as any)[attr] > (b as any)[attr]) { return 1; }
        return 0;
    })
}