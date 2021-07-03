import { createPullstateCore, Store } from 'pullstate';

import { ISecretStore, SecretStore } from './secrets/store';
import { ISettingStore, SettingStore } from './setting/store';
import { WindowStore } from './window/store';

export interface IStore {
    SettingStore: Store<ISettingStore>;
    SecretStore: Store<ISecretStore>;
}

export const PullstateCore = createPullstateCore({
    SettingStore,
    WindowStore,
    SecretStore
});