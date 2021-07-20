import { Store } from 'pullstate';
import { IAppletFile } from '../../contracts/interface/IFile';
import { IScanItem } from '../../contracts/virusScan';

export interface IMiscStore {
    fileToScan?: IScanItem;
    appletViewProperties?: IAppletFile;
    newEmailIsOpen: boolean;
}

export const defaultMiscProps: IMiscStore = {
    newEmailIsOpen: false,
};

export const MiscStore = new Store<IMiscStore>(defaultMiscProps);