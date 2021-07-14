import { appletsThatCanHaveTheirNamesChanged, AppletType } from '../../constants/enum/appletType';
import { LaunchedApp } from '../../contracts/launchedApp';
import { newGuid } from '../../helper/guidHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { IWindowStore } from './store';

export const openAppFromDesktop = (appletType: AppletType, name: LocaleKey, meta?: any) => (store: IWindowStore): IWindowStore => {
    // TODO - check if multiple instances allowed

    const multipeInstancesAllowed = false;
    const currentApp = store.activeApps.find(aa => aa.appletType === appletType);
    if (multipeInstancesAllowed == false && currentApp != null) {
        const guid = newGuid();
        const currentAppIsMin = currentApp?.meta?.isMinimised ?? false;
        if (currentAppIsMin) store = setMinimiseForApp(store, guid, false);
        if (meta) {
            store = setMetaForApp(store, guid, meta);
            if (appletsThatCanHaveTheirNamesChanged.includes(appletType)) {
                store.activeApps = [...store.activeApps.map(aa => ({ ...aa, name: name }))];
            }
        }
        store = setNewFocusForApp(guid)(store);
        return store;
    }

    const openAppFunc = openApp(appletType, name, meta);
    return openAppFunc(store);
}

export const openAppFromTaskbar = (app: LaunchedApp) => (store: IWindowStore): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.appletType === app.appletType);

    if (currentApp == null) {
        const openAppFunc = openApp(app.appletType, app.name, app.meta);
        return openAppFunc(store);
    }

    const currentAppIsOnTop = currentApp?.guid === store.currentFocused;
    const isNotMinimised = !(currentApp?.meta?.isMinimised);

    const setNewFocusForAppFunc = setNewFocusForApp(app.guid);
    store = setNewFocusForAppFunc(store);
    if (currentAppIsOnTop === false && isNotMinimised) return store;

    if (currentAppIsOnTop === false && isNotMinimised === false) {
        store = setMinimiseForApp(store, app.guid, false);
        return store;
    }

    store = setMinimiseForApp(store, app.guid);
    return store;
}

export const openApp = (appletType: AppletType, name: LocaleKey, meta?: any) => (store: IWindowStore): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const sortOrderArray = currentApps.map(aa => aa.openOrder);

    // TODO - check if multiple instances allowed
    const guid = newGuid();
    const newActiveApp: LaunchedApp = {
        guid,
        name,
        appletType,
        meta: meta ?? anyObject,
        openOrder: Math.max(...sortOrderArray, 0) + 5,
    };
    store.currentFocused = guid;
    store.activeApps = [...currentApps, newActiveApp];
    return store;
}

export const minimiseApp = (guid: string) => (store: IWindowStore): IWindowStore => {
    return setMinimiseForApp(store, guid, true);
}

export const setMinimiseForApp = (store: IWindowStore, guid: string, newMin?: boolean): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.guid === guid);
    const currentAppIsMin = (currentApp?.meta.isMinimised ?? false);

    const getNewMin = (currentApp: LaunchedApp): boolean => {
        if (currentApp.guid !== guid) return currentApp.meta.isMinimised ?? false;

        if (newMin != null) return newMin;
        return !(currentApp.meta.isMinimised ?? false);
    }

    if (currentAppIsMin) {
        store.currentFocused = currentApp?.guid ?? '';
    } else {
        store = InternalSetNewFocusForApp(store, guid);
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

export const maximiseApp = (guid: string) => (store: IWindowStore): IWindowStore => {
    store = setMaximiseForApp(store, guid);
    return store;
}

export const setMaximiseForApp = (store: IWindowStore, guid: string, newMax?: boolean): IWindowStore => {
    const sortOrderArray = store.activeApps.map(aa => aa.openOrder);

    const getNewMax = (currentApp: LaunchedApp): boolean => {
        if (currentApp.guid !== guid) return currentApp.meta.isMaximised ?? false;

        if (newMax != null) return newMax;
        return !(currentApp.meta.isMaximised ?? false);
    }

    const getNewOpenOrder = (currentApp: LaunchedApp): number => {
        if (currentApp.guid !== guid) return currentApp.openOrder;
        return Math.max(...sortOrderArray, 0) + 5;
    }

    store.activeApps = [
        ...store.activeApps.map(aa => ({
            ...aa,
            openOrder: getNewOpenOrder(aa),
            meta: {
                ...aa.meta,
                isMaximised: getNewMax(aa),
            }
        }))
    ];
    store.currentFocused = guid;
    return store;
}

export const closeApp = (guid: string) => (store: IWindowStore): IWindowStore => {
    store = InternalSetNewFocusForApp(store, guid);
    store.activeApps = [...store.activeApps.filter(aa => aa.guid !== guid)];
    return store;
}

export const setMetaForApp = (store: IWindowStore, guid: string, newMeta?: any): IWindowStore => {
    store.activeApps = [
        ...store.activeApps.map(aa => ({
            ...aa,
            meta: (aa.guid === guid) ? { ...newMeta } : { ...aa.meta }
        }))
    ];
    return store;
}

export const setNewFocusForApp = (guid: string) => (store: IWindowStore): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const currentApp = currentApps.find(aa => aa.guid === guid);
    if (currentApp == null) return store;

    const sortOrderArray = currentApps
        .filter(aa => aa.guid !== guid)
        .sort((a: LaunchedApp, b: LaunchedApp) => a.openOrder - b.openOrder)
        .map((aa, index) => ({ guid: aa.guid, openOrder: index }));
    const fullSortOrderArray = [...sortOrderArray, { guid: currentApp.guid, openOrder: sortOrderArray.length }];

    const newApps = currentApps.map((app: LaunchedApp, index: number) => {
        return {
            ...app,
            openOrder: fullSortOrderArray.find(aa => aa.guid === app.guid)?.openOrder ?? index,
        }
    });
    store.activeApps = [...newApps];
    store.currentFocused = guid;
    return store
}

const InternalSetNewFocusForApp = (store: IWindowStore, guid: string): IWindowStore => {
    const currentApps = store.activeApps.map(aa => ({ ...aa }));
    const sortOrderArray = currentApps.filter(aa => aa.guid !== guid).map(aa => aa.openOrder);
    // const nextAppToFocus = currentApps.find(aa => aa.openOrder === Math.max(...sortOrderArray));

    store.currentFocused = guid;
    return store;
}
