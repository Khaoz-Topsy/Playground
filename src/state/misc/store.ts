import { Store } from 'pullstate';
import { IScanItem } from '../../contracts/virusScan';

export interface IMiscStore {
    fileToScan?: IScanItem;
}

export const defaultMiscProps: IMiscStore = {
    // fileToScan: null,
};

export const MiscStore = new Store<IMiscStore>(defaultMiscProps);