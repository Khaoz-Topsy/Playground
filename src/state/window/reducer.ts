import { appletsThatCanHaveTheirNamesChanged, AppletType } from "../../constants/enum/appletType";
import { LaunchedApp } from "../../contracts/launchedApp";
import { anyObject } from "../../helper/typescriptHacks";
import { IWindowStore } from "./store";

export const openAppFromDesktop = (appletType: AppletType, name: string, meta?: any) => (store: IWindowStore): IWindowStore => {
    const currentApp = store.activeApps.find(aa => aa.appletType === appletType);
    if (currentApp != null) {
        const currentAppIsMin = currentApp?.meta?.isMinimised ?? false;
        if (currentAppIsMin) store = setMinimiseForApp(store, appletType, false);
        if (meta) {
            store = setMetaForApp(store, appletType, meta);
            if (appletsThatCanHaveTheirNamesChanged.includes(appletType)) {
                store.activeApps = [...store.activeApps.map(aa => ({ ...aa, name: name }))];
            }
        }
        store.currentFocused = currentApp.appletType;
        return store;
    }

    const sortOrderArray = store.activeApps.map(aa => aa.openOrder);
    // const numExisting: number = store.activeApps.filter(aa => aa.appletType === appletType).length;
    const newActiveApp: LaunchedApp = {
        // id: ((appletType as number) * 10) + (numExisting + 1),
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

export const setMetaForApp = (store: IWindowStore, appletType: AppletType, newMeta?: any): IWindowStore => {
    store.activeApps = [
        ...store.activeApps.map(aa => ({
            ...aa,
            meta: (aa.appletType === appletType) ? { ...newMeta } : { ...aa.meta }
        }))
    ];
    return store;
}

export const setNewFocusForApp = (appletType: AppletType) => (store: IWindowStore): IWindowStore => {
    // console.log('setNewFocusForApp');
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appletType === appletType);
    // console.log([...currentApps]);
    if (currentApp == null) return store;

    const sortOrderArray = currentApps
        .filter(aa => aa.appletType !== appletType)
        .sort((a: LaunchedApp, b: LaunchedApp) => a.openOrder - b.openOrder)
        .map((aa, index) => ({ appletType: aa.appletType, openOrder: index }));
    const fullSortOrderArray = [...sortOrderArray, { appletType: currentApp.appletType, openOrder: sortOrderArray.length }];
    // console.log([...fullSortOrderArray]);

    const newApps = currentApps.map((app: LaunchedApp, index: number) => {
        return {
            ...app,
            openOrder: fullSortOrderArray.find(aa => aa.appletType === app.appletType)?.openOrder ?? index,
        }
    });
    store.activeApps = [...newApps];
    store.currentFocused = appletType;
    // console.log([...newApps]);
    return store
}

const InternalSetNewFocusForApp = (store: IWindowStore, appletType: AppletType): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const sortOrderArray = currentApps.filter(aa => aa.appletType !== appletType).map(aa => aa.openOrder);
    const nextAppToFocus = currentApps.find(aa => aa.openOrder === Math.max(...sortOrderArray));

    store.currentFocused = (nextAppToFocus?.appletType ?? AppletType.none);
    return store;
}
