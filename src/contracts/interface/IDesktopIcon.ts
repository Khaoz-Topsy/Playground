import { AppletType } from '../../constants/enum/appletType';

export interface IDesktopIcon {
    imgUrl: string;
    title: string;
    appletType: AppletType;
}