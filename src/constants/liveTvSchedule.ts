import { LocaleKey } from "../localization/LocaleKey";

export interface ScheduleItem {
    utcHour: number;
    numHours: number;
    title: LocaleKey;
}

export const WeeklySchedule: Array<Array<ScheduleItem>> = [
    // sun
    [],
    // mon
    [],
    // tue
    [],
    // wed
    [],
    // thu
    [
        { utcHour: 17, numHours: 4, title: LocaleKey.codingStream }
    ],
    // fri
    [],
    // sat
    [
        { utcHour: 17, numHours: 4, title: LocaleKey.gamingStream }
    ],
]