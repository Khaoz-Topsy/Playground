import { funnyLoadingMessages } from "../constants/funnyLoadingMessages";

export const getFunnyMessages = (numOfMsgs: number): Array<string> => {
    let alreadyAddedIndexes: Array<string> = [];
    while (alreadyAddedIndexes.length < numOfMsgs) {
        const msgIndex = Math.floor(Math.random() * funnyLoadingMessages.length);
        if (alreadyAddedIndexes.includes(funnyLoadingMessages[msgIndex])) continue;
        alreadyAddedIndexes.push(funnyLoadingMessages[msgIndex]);
    }
    return alreadyAddedIndexes;
}