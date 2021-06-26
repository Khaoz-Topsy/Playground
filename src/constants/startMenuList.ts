
import { KnownApplets } from '../constants/knownApplets';
import { FileType, IAppletFile, IStartMenuAppletFile, IStartMenuFile, StartMenuSize } from '../contracts/interface/IFile';
import { MiscIcon } from './appImage';

export const StartMenuMostUsed: Array<IAppletFile> = [
    KnownApplets.settings,
    KnownApplets.nyanCat,
    KnownApplets.terminal,
    KnownApplets.vsCode,
];

export const StartMenuApplications: Array<IStartMenuAppletFile | IStartMenuFile> = [
    {
        ...KnownApplets.kurtLourens,
        name: 'Online CV',
        size: StartMenuSize.small,
        backgroundColour: '#abe9cd',
        backgroundImage: 'linear-gradient(315deg, #8ce1ba 0%, #3eadcf 74%)',


    },
    {
        ...KnownApplets.nyanCat,
        size: StartMenuSize.small,
    },
    {
        ...KnownApplets.terminal,
        size: StartMenuSize.small,
    },
    {
        ...KnownApplets.vsCode,
        size: StartMenuSize.small,
    },
    {
        id: 99,
        parentId: 99,
        name: 'TwitchStream',
        imgUrl: MiscIcon.streamPreview,
        type: FileType.link,
        size: StartMenuSize.large
    },
];