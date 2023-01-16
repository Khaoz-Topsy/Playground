import { Store } from "pullstate";
import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";
import { LocaleKey } from "../../localization/LocaleKey";

export interface IWindowStore {
    currentFocused: string;
    activeApps: Array<LaunchedApp>;
}

export const defaultWindowProps: IWindowStore = {
    currentFocused: '',
    activeApps: [
        {
            guid: '1',
            name: LocaleKey.powerPrezz,
            openOrder: 1,
            appletType: AppletType.powerPrezz,
            meta: {
                slides: 'EntelectTechAndBorrel2022-work-life',
                isMaximised: true,
            } as any,
        }
    ],
};

export const WindowStore = new Store<IWindowStore>(defaultWindowProps);