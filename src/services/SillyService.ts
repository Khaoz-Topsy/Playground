import { BatteryStatus, IBatteryData } from '../contracts/battery';
import { HarlemShake } from '../integration/harlemShake';
import { log } from '../integration/logging';

export class SillyService {
    private _isShaking: boolean;

    constructor() {
        this._isShaking = false;
    }

    doHarlemShake = () => {
        if (this._isShaking) {
            log('Harlem shake already in progress');
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

    batteryLevel = async (): Promise<IBatteryData> => {
        if ('getBattery' in navigator) {
            const battery = await (navigator as any).getBattery();
            const percent = (battery.level * 100);

            let status = BatteryStatus.Unknown;
            if (percent > 99) {
                status = BatteryStatus.PluggedInFullCharge;
            } else {
                if (battery.chargingTime > 0) status = BatteryStatus.PluggedInIsCharging;
                if (battery.dischargingTime < Infinity) status = BatteryStatus.Discharging;
            }

            return {
                status,
                chargingTime: battery.chargingTime ?? 0,
                dischargingTime: battery.dischargingTime ?? Infinity,
                percent,
            }
        }

        return {
            status: BatteryStatus.NotAvailable,
            chargingTime: 0,
            dischargingTime: Infinity,
            percent: -1,
        }
    }
}


