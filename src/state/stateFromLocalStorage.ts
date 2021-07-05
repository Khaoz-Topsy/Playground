import * as CacheKey from './cacheKey';
import { defaultSecretProps } from './secrets/store';
import { defaultSettingProps } from './setting/store';
import { IPersistedStore, IStore } from './stateCore';

const hash = require('object-hash');

export const getStateObj = (cacheKey: string, defaultProps: any) => {
    const cacheData = localStorage.getItem(cacheKey);
    if (cacheData == null) return defaultProps;

    return JSON.parse(cacheData);
}

export const loadStateFromLocalStorage = (): IPersistedStore => {
    let persistedState: IPersistedStore = {
        SettingStore: getStateObj(CacheKey.SettingKey, defaultSettingProps),
        SecretStore: getStateObj(CacheKey.SecretKey, defaultSecretProps),
    }
    return persistedState;
}

export const saveSubStateToLocalStorage = (cacheKey: string) => (store: any) => {
    const current = { ...store };
    const currentHash = hash(current);
    const storedHash = hash(getStateObj(cacheKey, {}));
    if (currentHash !== storedHash) {
        localStorage.setItem(cacheKey, JSON.stringify(current));
    }
}

type subscribeToState = (stores: IStore) => () => void;

export const subscribeToWindowsChanges: subscribeToState = (stores: IStore) =>
    stores.WindowStore.subscribe(
        store => store, (store: any) => console.log({ ...store })
    );

export const subscribeToSettingsChanges: subscribeToState = (stores: IStore) =>
    stores.SettingStore.subscribe(
        store => store, saveSubStateToLocalStorage(CacheKey.SettingKey)
    );

export const subscribeToSecretChanges: subscribeToState = (stores: IStore) =>
    stores.SecretStore.subscribe(
        store => store, saveSubStateToLocalStorage(CacheKey.SecretKey)
    );
