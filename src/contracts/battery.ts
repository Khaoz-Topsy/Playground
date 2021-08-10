export interface IBatteryData {
    status: BatteryStatus;
    chargingTime?: number;
    dischargingTime?: number;
    percent: number;
}

export enum BatteryStatus {
    Unknown,
    NotAvailable,
    PluggedInFullCharge,
    PluggedInIsCharging,
    Discharging,
}