
import { KnownApplets } from '../constants/knownApplets';
import { FileType, IAppletFile, IStartMenuAppletFile, IStartMenuFile, StartMenuAnimation, StartMenuSize } from '../contracts/interface/IFile';
import { LocaleKey } from '../localization/LocaleKey';
import { AppletIcon, FileIcon, MiscIcon } from './appImage';
import { site } from './site';

export const StartMenuMostUsed: Array<IAppletFile> = [
    KnownApplets.settings,
    KnownApplets.email,
    KnownApplets.terminal,
    KnownApplets.monitor,
    KnownApplets.liveTv,
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
        backgroundColour: '#F1E89D',
        textColour: 'black',
    },
    {
        ...KnownApplets.terminal,
        size: StartMenuSize.small,
        backgroundColour: 'silver',
        textColour: 'black',
    },
    {
        ...KnownApplets.vsCode,
        size: StartMenuSize.small,
        backgroundColour: '#0C76B3',
    },
    {
        id: 99,
        parentId: 99,
        name: LocaleKey.twitchStream,
        imgUrl: MiscIcon.streamPreview,
        isFull: true,
        type: FileType.link,
        meta: { external: site.kurt.twitch },
        size: StartMenuSize.large,
        animatedTile: StartMenuAnimation.slideverticalinverse,
        secondsPerImage: 10,
        images: [
            AppletIcon.twitch,
            MiscIcon.streamPreview,
        ]
    },
    {
        ...KnownApplets.email,
        size: StartMenuSize.small,
        backgroundColour: 'beige',
        textColour: 'black',
    },
    {
        ...KnownApplets.notes,
        size: StartMenuSize.small,
        backgroundColour: '#0C76B3',
    },
];

export const StartMenuExplore: Array<IStartMenuAppletFile | IStartMenuFile> = [
    {
        id: 201,
        parentId: 101,
        name: LocaleKey.assistantApps,
        imgUrl: AppletIcon.assistantApps,
        backgroundColour: '#1D1D1B',
        backgroundImage: 'linear-gradient(330deg, #1D1D1B 0%, #31312e 80%)',
        type: FileType.link,
        meta: { external: site.assistantApps.website },
        size: StartMenuSize.small,
    },
    {
        id: 202,
        parentId: 102,
        name: LocaleKey.assistantApps,
        imgUrl: FileIcon.discord,
        backgroundColour: '#1D1D1B',
        type: FileType.link,
        meta: { external: site.assistantApps.website },
        size: StartMenuSize.small,
    },
    {
        ...KnownApplets.twitterTimeline,
        id: 203,
        parentId: 103,
        backgroundColour: '#00ACED',
        meta: { src: site.assistantApps.nms.twitter },
        size: StartMenuSize.small,
    },
    {
        id: 204,
        parentId: 104,
        name: LocaleKey.blog,
        imgUrl: AppletIcon.blog,
        backgroundColour: '#2C2C2C',
        backgroundImage: 'linear-gradient(315deg, #232323 0%, #2C2C2C 75%)',
        type: FileType.link,
        meta: { external: site.kurt.blog },
        size: StartMenuSize.small,
    },
];
