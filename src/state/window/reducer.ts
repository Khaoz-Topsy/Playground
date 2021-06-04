import { AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";
import { anyObject } from "../../helper/typescriptHacks";
import { IWindowStore } from "./store";

export const openAppFromDesktop = (appType: AppletType) => (store: IWindowStore): IWindowStore => {
    const currentApp = store.activeApps.find(aa => aa.appType === appType);
    if (currentApp != null) {
        store = setMinimiseForApp(store, appType);
        store.currentFocused = currentApp.appType;
        return store;
    }

    const sortOrderArray = store.activeApps.map(aa => aa.openOrder);
    const newActiveApp: LaunchedApp = {
        appType,
        meta: anyObject,
        openOrder: Math.max(...sortOrderArray, 0) + 5,
    };

    store.currentFocused = appType;
    store.activeApps = [...store.activeApps, newActiveApp];
    return store;
}

export const openAppFromTaskbar = (appType: AppletType) => (store: IWindowStore): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appType === appType);

    const currentAppIsOnTop = currentApp?.appType === store.currentFocused;
    const isNotMinimised = !(currentApp?.meta?.isMinimised);

    if (currentAppIsOnTop === false && isNotMinimised) {
        store.currentFocused = currentApp?.appType ?? AppletType.none;
        return store;
    }

    if (currentAppIsOnTop === false && isNotMinimised === false) {
        store.currentFocused = currentApp?.appType ?? AppletType.none;
        store = setMinimiseForApp(store, appType, false);
        return store;
    }

    store = InternalSetNewFocusForApp(store, appType);
    store = setMinimiseForApp(store, appType);
    return store;
}

export const closeApp = (appType: AppletType) => (store: IWindowStore): IWindowStore => {
    store = InternalSetNewFocusForApp(store, appType);
    store.activeApps = [...store.activeApps.filter(aa => aa.appType !== appType)];
    return store;
}

export const minimiseApp = (appType: AppletType) => (store: IWindowStore): IWindowStore => {
    return setMinimiseForApp(store, appType, true);
}

export const setMinimiseForApp = (store: IWindowStore, appType: AppletType, newMin?: boolean): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appType === appType);
    const currentAppIsMin = (currentApp?.meta.isMinimised ?? false);

    const getNewMin = (currentApp: LaunchedApp): boolean => {
        if (currentApp.appType !== appType) return currentApp.meta.isMinimised ?? false;

        if (newMin != null) return newMin;
        return !(currentApp.meta.isMinimised ?? false);
    }

    if (currentAppIsMin) {
        store.currentFocused = currentApp?.appType ?? AppletType.none;
    } else {
        store = InternalSetNewFocusForApp(store, appType);
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

export const setNewFocusForApp = (appType: AppletType) => (store: IWindowStore): IWindowStore => {
    store.currentFocused = appType ?? AppletType.none
    return store
}

const InternalSetNewFocusForApp = (store: IWindowStore, appType: AppletType): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const sortOrderArray = currentApps.filter(aa => aa.appType !== appType).map(aa => aa.openOrder);
    const nextAppToFocus = currentApps.find(aa => aa.openOrder === Math.max(...sortOrderArray));

    store.currentFocused = (nextAppToFocus?.appType ?? AppletType.none);
    return store;
}
