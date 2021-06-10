import { Store } from "pullstate";

export interface ISettingStore {
    background: string;
    enabledClippy: boolean;
}

export const SettingStore = new Store<ISettingStore>({
    background: 'bg1',
    enabledClippy: false,
});