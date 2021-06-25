
import { KnownApplets } from '../constants/knownApplets';
import { IAppletFile, IStartMenuAppletFile, StartMenuSize } from '../contracts/interface/IFile';

export const StartMenuMostUsed: Array<IAppletFile> = [
    KnownApplets.settings,
    KnownApplets.nyanCat,
    KnownApplets.terminal,
    KnownApplets.vsCode,
];

export const StartMenuApplications: Array<IStartMenuAppletFile> = [
    { ...KnownApplets.settings, size: StartMenuSize.small },
    { ...KnownApplets.nyanCat, size: StartMenuSize.small },
    { ...KnownApplets.terminal, size: StartMenuSize.small },
    { ...KnownApplets.vsCode, size: StartMenuSize.small },
];