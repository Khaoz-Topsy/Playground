
import { KnownApplets } from '../constants/knownApplets';
import { IAppletFile } from '../contracts/interface/IFile';

export const TaskbarList: Array<IAppletFile> = [
    KnownApplets.explorer,
    KnownApplets.browser,
    KnownApplets.email,
    KnownApplets.terminal,
    KnownApplets.settings,
];