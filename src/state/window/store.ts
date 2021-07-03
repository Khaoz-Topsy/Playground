import { Store } from "pullstate";
import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";

export interface IWindowStore {
    currentFocused: AppletType;
    activeApps: Array<LaunchedApp>;
}

export const defaultWindowProps = {
    currentFocused: AppletType.none,
    activeApps: [],
};

export const WindowStore = new Store<IWindowStore>(defaultWindowProps);