
import { KnownApplets } from '../constants/knownApplets';
import { FileType, IAppletFile, IStartMenuAppletFile, IStartMenuFile, StartMenuSize } from '../contracts/interface/IFile';
import { LocaleKey } from '../localization/LocaleKey';
import { MiscIcon } from './appImage';
import { site } from './site';

export const StartMenuMostUsed: Array<IAppletFile> = [
    KnownApplets.settings,
    KnownApplets.nyanCat,
    KnownApplets.terminal,
    KnownApplets.vsCode,
];

export const StartMenuApplications: Array<IStartMenuAppletFile | IStartMenuFile> = [
    {
        ...KnownApplets.kurtLourens,
        name: LocaleKey.onlineCV,
        size: StartMenuSize.small,
        backgroundColour: '#abe9cd',
        backgroundImage: 'linear-gradient(315deg, #8ce1ba 0%, #3eadcf 74%)',
        textColour: 'black',
    },
    {
        ...KnownApplets.musicPlayer,
        size: StartMenuSize.small,
        backgroundColour: 'yellow',
        textColour: 'black',
    },
    {
        ...KnownApplets.terminal,
        size: StartMenuSize.small,
        textColour: 'black',
    },
    {
        ...KnownApplets.vsCode,
        size: StartMenuSize.small,
    },
    {
        id: 99,
        parentId: 99,
        name: LocaleKey.twitchStream,
        imgUrl: MiscIcon.streamPreview,
        isFull: true,
        type: FileType.link,
        meta: { external: site.kurt.twitch },
        size: StartMenuSize.large
    },
    {
        ...KnownApplets.email,
        size: StartMenuSize.small,
    },
];