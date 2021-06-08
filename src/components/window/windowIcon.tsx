import { AppletIcon } from '../../constants/appImage';
import { AppletType } from '../../constants/enum/appletType';
import { BasicImage } from '../../components/core/image';

export const windowIconString = (appletType: AppletType): string => {
    switch (appletType) {
        case AppletType.setting: return AppletIcon.settings;
        case AppletType.nyanCat: return AppletIcon.nyanCat;
        case AppletType.terminal: return AppletIcon.terminal;
        case AppletType.explorer: return AppletIcon.folder;
    }
    return AppletIcon.error;
}

export const windowIcon = (appletType: AppletType) => (<BasicImage imageUrl={windowIconString(appletType)} classNames="noselect" />);
export const windowTaskbarIcon = (appletType: AppletType) => (<BasicImage imageUrl={windowIconString(appletType)} />);
