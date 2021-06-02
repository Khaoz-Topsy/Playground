import { Store } from "pullstate";
import { AppletType } from "../constants/enum/appletType";
import { LaunchedApp } from "../contracts/launchedApp";

interface IStore {
    currentFocused: AppletType;
    activeApps: Array<LaunchedApp>;
}

export const WindowStore = new Store<IStore>({
    currentFocused: AppletType.none,
    activeApps: [],
});