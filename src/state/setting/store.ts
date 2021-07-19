import { Store } from "pullstate";

export interface ISettingStore {
    background: string;
    enabledClippy: boolean;
    brightness: number;
    volume: number;
    language: string;
    showSecretHints: boolean;
}

export const defaultSettingProps: ISettingStore = {
    background: 'bg1',
    enabledClippy: false,
    brightness: 100,
    volume: 100,
    language: 'en',
    showSecretHints: false,
};

export const SettingStore = new Store<ISettingStore>(defaultSettingProps);