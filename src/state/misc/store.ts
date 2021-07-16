import { Store } from 'pullstate';
import { IAppletFile } from '../../contracts/interface/IFile';
import { IScanItem } from '../../contracts/virusScan';

export interface IMiscStore {
    fileToScan?: IScanItem;
    appletViewProperties?: IAppletFile;
}

export const defaultMiscProps: IMiscStore = {
    // fileToScan: null,
};

export const MiscStore = new Store<IMiscStore>(defaultMiscProps);