import { HarlemShake } from '../integration/harlemShake';

export class SillyService {
    private _isShaking: boolean;

    constructor() {
        this._isShaking = false;
    }

    doHarlemShake = () => {
        if (this._isShaking) {
            console.log('Harlem shake already in progress');
            return;
        }
        this._isShaking = true;
        const harlemOptions = {
            singleDancer: ".desktop-icon-slot",
            allDancer: ["p", "img", "a", "label"],
            volumeLevel: 0.1,
        };

        new HarlemShake(harlemOptions, 'assets/sound/harlem-shake.mp3')
            .start()
            .finally(() => {
                this._isShaking = false;
            });
    }
}


