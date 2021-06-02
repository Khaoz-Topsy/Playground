
import { AppletType } from './enum/appletType';
import { AppImage } from '../constants/appImage';
import { IDesktopIcon } from '../contracts/interface/IDesktopIcon';

export const DesktopIcons: Array<IDesktopIcon> = [
    {
        imgUrl: AppImage.kurt,
        title: 'Kurt Lourens',
        appletType: AppletType.setting,
    },
    {
        imgUrl: AppImage.assistantNMS,
        title: 'Assistant for No Man\'s Sky',
        appletType: AppletType.assistantNMS,
    },
    {
        imgUrl: AppImage.assistantSMS,
        title: 'Assistant for Scrap Mechanic',
        appletType: AppletType.assistantSMS,
    },
];