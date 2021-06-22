import { AppletIcon, FileIcon, error } from '../../constants/appImage';
import { AppletType } from '../../constants/enum/appletType';
import { BasicImage } from '../../components/core/image';

export const windowIconString = (appletType: AppletType): string => {
    switch (appletType) {
        case AppletType.setting: return AppletIcon.settings;
        case AppletType.terminal: return AppletIcon.terminal;
        case AppletType.explorer: return AppletIcon.folder;
        case AppletType.picture: return FileIcon.picture;
        case AppletType.notes: return FileIcon.markdown;

        case AppletType.assistantSMS: return AppletIcon.assistantSMS;
        case AppletType.kurt: return AppletIcon.kurt;
        case AppletType.vsCode: return AppletIcon.vsCode;
        case AppletType.nyanCat: return AppletIcon.nyanCat;
    }
    return error;
}


export const iframeIcon = (imgUrl: string) => (<BasicImage imageUrl={(imgUrl == null || imgUrl.length < 5) ? error : imgUrl} classNames="noselect" />);
export const windowIcon = (appletType: AppletType) => (<BasicImage imageUrl={windowIconString(appletType)} classNames="noselect" />);
export const windowTaskbarIcon = (appletType: AppletType) => (<BasicImage imageUrl={windowIconString(appletType)} />);
