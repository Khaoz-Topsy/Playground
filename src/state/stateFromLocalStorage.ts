import * as CacheKey from './cacheKey';
import { defaultSecretProps } from './secrets/store';
import { defaultSettingProps } from './setting/store';
import { defaultWindowProps } from './window/store';
import { IStore } from './stateCore';

const hash = require('object-hash');

export const getStateObj = (cacheKey: string, defaultProps: any) => {
    const cacheData = localStorage.getItem(cacheKey);
    if (cacheData == null) return defaultProps;

    return JSON.parse(cacheData);
}

export const loadStateFromLocalStorage = (): any => {
    let persistedState: any = {
        allState: {
            SettingStore: getStateObj(CacheKey.SettingKey, defaultSettingProps),
            SecretStore: getStateObj(CacheKey.SecretKey, defaultSecretProps),
            WindowStore: defaultWindowProps
        }
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

export const subscribeToSettingsChanges = (stores: IStore) =>
    stores.SettingStore.subscribe(
        store => store, saveSubStateToLocalStorage(CacheKey.SettingKey)
    );

export const subscribeToSecretChanges = (stores: IStore) =>
    stores.SecretStore.subscribe(
        store => store, saveSubStateToLocalStorage(CacheKey.SecretKey)
    );
