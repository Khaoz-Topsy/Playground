import { LocaleKey } from "../localization/LocaleKey";

export interface ScheduleItem {
    utcHour: number;
    numHours: number;
    title: LocaleKey;
    descrip: LocaleKey;
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
        { utcHour: 19, numHours: 4, title: LocaleKey.assistantSMS, descrip: LocaleKey.brightness }
    ],
    // fri
    [],
    // sat
    [
        { utcHour: 19, numHours: 4, title: LocaleKey.assistantSMS, descrip: LocaleKey.brightness }
    ],
]