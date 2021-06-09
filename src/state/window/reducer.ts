import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";
import { anyObject } from "../../helper/typescriptHacks";
import { IWindowStore } from "./store";

export const openAppFromDesktop = (appletType: AppletType, name: string, meta?: any) => (store: IWindowStore): IWindowStore => {
    const currentApp = store.activeApps.find(aa => aa.appletType === appletType);
    if (currentApp != null) {
        store = setMinimiseForApp(store, appletType);
        store.currentFocused = currentApp.appletType;
        return store;
    }

    const sortOrderArray = store.activeApps.map(aa => aa.openOrder);
    const newActiveApp: LaunchedApp = {
        name,
        appletType,
        meta: meta ?? anyObject,
        openOrder: Math.max(...sortOrderArray, 0) + 5,
    };

    store.currentFocused = appletType;
    store.activeApps = [...store.activeApps, newActiveApp];
    return store;
}

export const openAppFromTaskbar = (appletType: AppletType) => (store: IWindowStore): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appletType === appletType);

    const currentAppIsOnTop = currentApp?.appletType === store.currentFocused;
    const isNotMinimised = !(currentApp?.meta?.isMinimised);

    if (currentAppIsOnTop === false && isNotMinimised) {
        store.currentFocused = currentApp?.appletType ?? AppletType.none;
        return store;
    }

    if (currentAppIsOnTop === false && isNotMinimised === false) {
        store.currentFocused = currentApp?.appletType ?? AppletType.none;
        store = setMinimiseForApp(store, appletType, false);
        return store;
    }

    store = InternalSetNewFocusForApp(store, appletType);
    store = setMinimiseForApp(store, appletType);
    return store;
}

export const closeApp = (appletType: AppletType) => (store: IWindowStore): IWindowStore => {
    store = InternalSetNewFocusForApp(store, appletType);
    store.activeApps = [...store.activeApps.filter(aa => aa.appletType !== appletType)];
    return store;
}

export const minimiseApp = (appletType: AppletType) => (store: IWindowStore): IWindowStore => {
    return setMinimiseForApp(store, appletType, true);
}

export const setMinimiseForApp = (store: IWindowStore, appletType: AppletType, newMin?: boolean): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appletType === appletType);
    const currentAppIsMin = (currentApp?.meta.isMinimised ?? false);

    const getNewMin = (currentApp: LaunchedApp): boolean => {
        if (currentApp.appletType !== appletType) return currentApp.meta.isMinimised ?? false;

        if (newMin != null) return newMin;
        return !(currentApp.meta.isMinimised ?? false);
    }

    if (currentAppIsMin) {
        store.currentFocused = currentApp?.appletType ?? AppletType.none;
    } else {
        store = InternalSetNewFocusForApp(store, appletType);
    }
    store.activeApps = [
        ...store.activeApps.map(aa => ({
            ...aa,
            meta: {
                ...aa.meta,
                isMinimised: getNewMin(aa),
            }
        }))
    ];
    return store;
}

export const setNewFocusForApp = (appletType: AppletType) => (store: IWindowStore): IWindowStore => {
    store.currentFocused = appletType ?? AppletType.none
    return store
}

const InternalSetNewFocusForApp = (store: IWindowStore, appletType: AppletType): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const sortOrderArray = currentApps.filter(aa => aa.appletType !== appletType).map(aa => aa.openOrder);
    const nextAppToFocus = currentApps.find(aa => aa.openOrder === Math.max(...sortOrderArray));

    store.currentFocused = (nextAppToFocus?.appletType ?? AppletType.none);
    return store;
}
