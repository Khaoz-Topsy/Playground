import { FileType, IAppletFile } from '../contracts/interface/IFile';
import { AppletIcon } from './appImage';
import { AppletType } from './enum/appletType';

export class KnownApplets {
    static settings: IAppletFile = {
        id: 1.1,
        name: 'Settings',
        imgUrl: AppletIcon.settings,
        appletType: AppletType.setting,
        type: FileType.applet,
    };
    static terminal: IAppletFile = {
        id: 1.2,
        name: 'Terminal',
        imgUrl: AppletIcon.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
    };
    static explorer: IAppletFile = {
        id: 1.3,
        name: 'Explorer',
        imgUrl: AppletIcon.folder,
        appletType: AppletType.explorer,
        type: FileType.applet,
    };
    static kurtLourens: IAppletFile = {
        id: 1.4,
        name: 'Kurt Lourens CV',
        imgUrl: AppletIcon.kurt,
        appletType: AppletType.kurt,
        type: FileType.applet,
    };
    static vsCode: IAppletFile = {
        id: 1.5,
        name: 'VS Code',
        imgUrl: AppletIcon.vsCode,
        appletType: AppletType.vsCode,
        type: FileType.applet,
    };


    static nyanCat: IAppletFile = {
        id: 1.99,
        name: 'Nyan Cat',
        imgUrl: AppletIcon.nyanCat,
        appletType: AppletType.nyanCat,
        type: FileType.applet,
    };
}

export const allKnownApps = () => {
    const apps: Array<IAppletFile> = [];
    for (const appletProp in KnownApplets) {
        if (Object.prototype.hasOwnProperty.call(KnownApplets, appletProp)) {
            const applet: IAppletFile = (KnownApplets as any)[appletProp];
            if (applet.appletType === AppletType.explorer) continue;
            apps.push(applet);
        }
    }
    return apps;
}
