import { Store } from "pullstate";
import { LaunchedApp } from "../../contracts/launchedApp";

export interface IWindowStore {
    currentFocused: string;
    activeApps: Array<LaunchedApp>;
}

export const defaultWindowProps: IWindowStore = {
    currentFocused: '',
    activeApps: [],
};

export const WindowStore = new Store<IWindowStore>(defaultWindowProps);