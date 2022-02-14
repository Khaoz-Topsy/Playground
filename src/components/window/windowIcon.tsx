import { AppletIcon, FileIcon, error, MiscIcon } from '../../constants/appImage';
import { AppletType } from '../../constants/enum/appletType';
import { BasicImage } from '../../components/core/image';

export const windowIconString = (appletType: AppletType): string => {
    switch (appletType) {
        case AppletType.kurt: return AppletIcon.kurt;
        case AppletType.email: return AppletIcon.email;
        case AppletType.notes: return FileIcon.markdown;
        case AppletType.picture: return FileIcon.picture;
        case AppletType.vsCode: return AppletIcon.vsCode;
        case AppletType.liveTv: return AppletIcon.liveTv;
        case AppletType.monitor: return AppletIcon.monitor;
        case AppletType.nyanCat: return AppletIcon.nyanCat;
        case AppletType.tweeter: return AppletIcon.twitter;
        case AppletType.swagger: return FileIcon.swagger;
        case AppletType.explorer: return AppletIcon.folder;
        case AppletType.browser: return AppletIcon.internet;
        case AppletType.setting: return AppletIcon.settings;
        case AppletType.terminal: return AppletIcon.terminal;
        case AppletType.musicPlayer: return AppletIcon.music;
        case AppletType.discordInvite: return FileIcon.discord;
        case AppletType.minecraft: return AppletIcon.minecraft;
        case AppletType.yellowPages: return AppletIcon.yellowPages;
        case AppletType.iotPublication: return MiscIcon.iotPublication;
        case AppletType.presentation: return AppletIcon.presentation;
        case AppletType.assistantNMS: return AppletIcon.assistantNMS;
        case AppletType.assistantSMS: return AppletIcon.assistantSMS;
    }
    return error;
}


export const iframeIcon = (imgUrl: string) => (<BasicImage imageUrl={(imgUrl == null || imgUrl.length < 5) ? error : imgUrl} classNames="noselect" />);
export const windowIcon = (appletType: AppletType, onClick?: (e: any) => void) => (<BasicImage imageUrl={windowIconString(appletType)} classNames="noselect" onClick={onClick} />);
export const windowTaskbarIcon = (appletType: AppletType) => (<BasicImage imageUrl={windowIconString(appletType)} />);
