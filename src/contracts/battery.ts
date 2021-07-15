export interface IBatteryData {
    status: BatteryStatus;
    chargingTime?: number;
    dischargingTime?: number;
    percent: number;
}

export enum BatteryStatus {
    Unknown,
    PluggedInFullCharge,
    PluggedInIsCharging,
    Discharging,
}