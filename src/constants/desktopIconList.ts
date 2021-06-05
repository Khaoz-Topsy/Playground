
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
        imgUrl: AppImage.nyanCat,
        title: 'Nyan Cat',
        appletType: AppletType.nyanCat,
    },
    {
        imgUrl: AppImage.terminal,
        title: 'Terminal',
        appletType: AppletType.terminal,
    },
];