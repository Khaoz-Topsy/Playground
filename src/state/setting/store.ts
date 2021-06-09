import { Store } from "pullstate";
import { Background } from "../../constants/appImage";

export interface ISettingStore {
    background: string;
}

export const SettingStore = new Store<ISettingStore>({
    background: Background.bg1
});