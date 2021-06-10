import { Store } from "pullstate";
import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";

export interface IWindowStore {
    currentFocused: AppletType;
    activeApps: Array<LaunchedApp>;
}

export const WindowStore = new Store<IWindowStore>({
    currentFocused: AppletType.explorer,
    activeApps: [{
        // id: 0,
        name: 'explorer',
        appletType: AppletType.explorer,
        openOrder: 1,
        meta: {},
    }],
});