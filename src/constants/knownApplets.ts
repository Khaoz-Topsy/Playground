import { FileType, IAppletFile } from '../contracts/interface/IFile';
import { getIframeUrl } from '../helper/iframeHelper';
import { LocaleKey } from '../localization/LocaleKey';
import { AppletType } from './enum/appletType';

export class KnownApplets {
    static settings: IAppletFile = {
        id: 1.01,
        parentId: 1.01,
        name: LocaleKey.settings,
        appletType: AppletType.setting,
        type: FileType.applet,
        info: { version: '1.0.9', size: 20, installedOn: new Date('2021-06-02') },
    };
    static explorer: IAppletFile = {
        id: 1.02,
        parentId: 1.02,
        name: LocaleKey.explorer,
        appletType: AppletType.explorer,
        type: FileType.applet,
        info: { version: '12.71', size: 55, installedOn: new Date('2021-06-23') },
    };
    static picture: IAppletFile = {
        id: 1.03,
        parentId: 1.03,
        name: LocaleKey.pictureViewer,
        appletType: AppletType.picture,
        type: FileType.applet,
        info: { version: '0.1.9', size: 121, installedOn: new Date('2021-06-10') },
    };
    static notes: IAppletFile = {
        id: 1.04,
        parentId: 1.04,
        name: LocaleKey.notes,
        appletType: AppletType.notes,
        type: FileType.applet,
        info: { version: '0.2.2', size: 700, installedOn: new Date('2021-06-20') },
    };
    static terminal: IAppletFile = {
        id: 1.20,
        parentId: 1.20,
        name: LocaleKey.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
        info: { version: '1.6.8', size: 5341, installedOn: new Date('2021-06-14'), author: 'Simon Ma - 中文文档', projectUrl: 'https://www.npmjs.com/package/react-terminal-app' },
    };
    static kurtLourens: IAppletFile = {
        id: 1.21,
        parentId: 1.21,
        name: LocaleKey.kurtLourensCV,
        appletType: AppletType.kurt,
        type: FileType.applet,
        info: { version: '5.1.36', size: 232, installedOn: new Date('2021-05-22') },
    };
    static vsCode: IAppletFile = {
        id: 1.22,
        parentId: 1.22,
        name: LocaleKey.vsCode,
        appletType: AppletType.vsCode,
        type: FileType.applet,
        info: { version: '1.55.0-dev', size: 5063, installedOn: new Date('2021-06-06'), author: 'conwnet', projectUrl: 'https://github.com/conwnet/github1s' },
    };
    static scrapMechanic: IAppletFile = {
        id: 1.23,
        parentId: 1.23,
        name: LocaleKey.assistantSMS,
        appletType: AppletType.assistantSMS,
        type: FileType.applet,
        info: { version: '0.5.1', size: 5907, installedOn: new Date('2021-06-11') },
    };
    static musicPlayer: IAppletFile = {
        id: 1.24,
        parentId: 1.24,
        name: LocaleKey.musicPlayer,
        appletType: AppletType.musicPlayer,
        type: FileType.applet,
        info: { version: '62.548.1', size: 98, installedOn: new Date('2021-06-27') },
    };
    static email: IAppletFile = {
        id: 1.25,
        parentId: 1.25,
        name: LocaleKey.email,
        appletType: AppletType.email,
        type: FileType.applet,
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    static monitor: IAppletFile = {
        id: 1.26,
        parentId: 1.26,
        name: LocaleKey.monitor,
        appletType: AppletType.monitor,
        type: FileType.applet,
        meta: { key: "monitor-iframe", src: getIframeUrl({ appletType: AppletType.monitor } as any) },
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    // static liveTv: IAppletFile = {
    //     id: 1.27,
    //     parentId: 1.27,
    //     name: LocaleKey.liveTv,
    //     appletType: AppletType.liveTv,
    //     type: FileType.applet,
    //     info: { version: '0.44.4', size: 3751, installedOn: new Date('2021-07-12') },
    // };


    static nyanCat: IAppletFile = {
        id: 1.99,
        parentId: 1.99,
        name: LocaleKey.nyanCat,
        appletType: AppletType.nyanCat,
        type: FileType.applet,
        info: { version: '0.3.4', size: 20, installedOn: new Date('2021-06-04'), author: 'Cristina Sturm', projectUrl: 'https://cristurm.github.io/nyan-cat/' },
    };
}

export const allKnownApps = (): Array<IAppletFile> => {
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
