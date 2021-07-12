import { LocaleKey } from "../../localization/LocaleKey";

export interface IKeyBindShortcut {
    name: LocaleKey;
    keys: Array<string>;
    descrip?: LocaleKey;
}

export interface IKeyBindSection {
    name: LocaleKey,
    shortcuts: Array<IKeyBindShortcut>
}