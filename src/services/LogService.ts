export class LogService {
    private _consoleLogDebug: boolean;

    constructor() {
        this._consoleLogDebug = window.config.consoleLogDebug;
    }

    log = (message?: any, ...optionalParams: any[]) => {
        if (!this._consoleLogDebug) return;
        console.log(message, optionalParams);
    }

    warn = (message?: any, ...optionalParams: any[]) => {
        if (!this._consoleLogDebug) return;
        console.warn(message, optionalParams);
    }
}
