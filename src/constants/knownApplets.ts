import { FileType, IAppletFile } from '../contracts/interface/IFile';
import { AppletIcon } from './appImage';
import { AppletType } from './enum/appletType';

export class KnownApplets {
    static settings: IAppletFile = {
        id: 101,
        name: 'Settings',
        imgUrl: AppletIcon.settings,
        appletType: AppletType.setting,
        type: FileType.applet,
    };
    static terminal: IAppletFile = {
        id: 102,
        name: 'Terminal',
        imgUrl: AppletIcon.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
    };
    static explorer: IAppletFile = {
        id: 103,
        name: 'Explorer',
        imgUrl: AppletIcon.folder,
        appletType: AppletType.explorer,
        type: FileType.applet,
    };
    static nyanCat: IAppletFile = {
        id: 104,
        name: 'Nyan Cat',
        imgUrl: AppletIcon.nyanCat,
        appletType: AppletType.nyanCat,
        type: FileType.applet,
    };
    static vsCode: IAppletFile = {
        id: 105,
        name: 'VS Code',
        imgUrl: AppletIcon.kurt,
        appletType: AppletType.vsCode,
        type: FileType.applet,
    };
}
