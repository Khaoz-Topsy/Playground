import { Store } from "pullstate";
import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";

export interface IWindowStore {
    currentFocused: AppletType;
    activeApps: Array<LaunchedApp>;
}

export const WindowStore = new Store<IWindowStore>({
    // currentFocused: AppletType.none,
    // activeApps: [],
    currentFocused: AppletType.explorer,
    activeApps: [{
        appType: AppletType.explorer,
        title: 'explorer',
        openOrder: 5,
        meta: {},
    }],
});