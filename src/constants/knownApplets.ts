import { FileType, IAppletFile } from '../contracts/interface/IFile';
import { AppletIcon, FileIcon } from './appImage';
import { AppletType } from './enum/appletType';
export class KnownApplets {
    static settings: IAppletFile = {
        id: 1.01,
        parentId: 1.01,
        name: 'Settings',
        imgUrl: AppletIcon.settings,
        appletType: AppletType.setting,
        type: FileType.applet,
    };
    static explorer: IAppletFile = {
        id: 1.02,
        parentId: 1.02,
        name: 'Explorer',
        imgUrl: AppletIcon.folder,
        appletType: AppletType.explorer,
        type: FileType.applet,
    };
    static picture: IAppletFile = {
        id: 1.03,
        parentId: 1.03,
        name: 'Picture Viewer',
        imgUrl: FileIcon.picture,
        appletType: AppletType.picture,
        type: FileType.applet,
    };
    static notes: IAppletFile = {
        id: 1.04,
        parentId: 1.04,
        name: 'Notes',
        imgUrl: FileIcon.markdown,
        appletType: AppletType.notes,
        type: FileType.applet,
    };
    static terminal: IAppletFile = {
        id: 1.20,
        parentId: 1.20,
        name: 'Terminal',
        imgUrl: AppletIcon.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
    };
    static kurtLourens: IAppletFile = {
        id: 1.21,
        parentId: 1.21,
        name: 'Kurt Lourens CV',
        imgUrl: AppletIcon.kurt,
        appletType: AppletType.kurt,
        type: FileType.applet,
    };
    static vsCode: IAppletFile = {
        id: 1.22,
        parentId: 1.22,
        name: 'VS Code',
        imgUrl: AppletIcon.vsCode,
        appletType: AppletType.vsCode,
        type: FileType.applet,
    };
    static scrapMechanic: IAppletFile = {
        id: 1.23,
        parentId: 1.23,
        name: 'Assistant for Scrap Mechanic',
        imgUrl: AppletIcon.assistantSMS,
        appletType: AppletType.assistantSMS,
        type: FileType.applet,
    };


    static nyanCat: IAppletFile = {
        id: 1.99,
        parentId: 1.99,
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
