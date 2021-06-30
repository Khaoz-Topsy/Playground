import { LocaleKey } from "../../localization/LocaleKey";

export interface IExistingNoteMeta {
    guid: string;
    name: LocaleKey;
    fileUrl: string;
    date: string;
}