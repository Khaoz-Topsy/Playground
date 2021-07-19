import { FileType, IAppletFile } from '../contracts/interface/IFile';
import { getIframeUrl } from '../helper/iframeHelper';
import { LocaleKey } from '../localization/LocaleKey';
import { appletsHiddenFromApplicationFolder, AppletType } from './enum/appletType';

export class KnownApplets {
    static settings: IAppletFile = {
        id: 1.01,
        parentId: 1.01,
        name: LocaleKey.settings,
        appletType: AppletType.setting,
        type: FileType.applet,
        info: { version: '1.0.9', size: 20, installedOn: new Date('2021-06-02'), updatedOn: new Date('2021-07-14') },
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
        numAllowedInstances: 3,
        info: { version: '0.1.9', size: 121, installedOn: new Date('2021-06-10') },
    };
    static nyanCat: IAppletFile = {
        id: 1.04,
        parentId: 1.04,
        name: LocaleKey.nyanCat,
        appletType: AppletType.nyanCat,
        type: FileType.applet,
        numAllowedInstances: 3,
        info: { version: '0.3.4', size: 20, installedOn: new Date('2021-06-04'), author: 'Cristina Sturm', projectUrl: 'https://cristurm.github.io/nyan-cat/' },
    };
    static notes: IAppletFile = {
        id: 1.05,
        parentId: 1.05,
        name: LocaleKey.notes,
        appletType: AppletType.notes,
        type: FileType.applet,
        numAllowedInstances: 5,
        info: { version: '0.2.2', size: 700, installedOn: new Date('2021-06-20') },
    };
    static terminal: IAppletFile = {
        id: 1.06,
        parentId: 1.06,
        name: LocaleKey.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
        info: { version: '1.6.8', size: 5341, installedOn: new Date('2021-06-14'), author: 'Simon Ma - 中文文档', projectUrl: 'https://www.npmjs.com/package/react-terminal-app' },
    };
    static kurtLourens: IAppletFile = {
        id: 1.07,
        parentId: 1.07,
        name: LocaleKey.kurtLourensCV,
        appletType: AppletType.kurt,
        type: FileType.applet,
        info: { version: '5.1.36', size: 232, installedOn: new Date('2021-05-22') },
    };
    static vsCode: IAppletFile = {
        id: 1.08,
        parentId: 1.08,
        name: LocaleKey.vsCode,
        appletType: AppletType.vsCode,
        type: FileType.applet,
        info: { version: '1.55.0-dev', size: 5063, installedOn: new Date('2021-06-06'), author: 'conwnet', projectUrl: 'https://github.com/conwnet/github1s' },
    };
    static scrapMechanic: IAppletFile = {
        id: 1.09,
        parentId: 1.09,
        name: LocaleKey.assistantSMS,
        appletType: AppletType.assistantSMS,
        type: FileType.applet,
        info: { version: '0.5.1', size: 5907, installedOn: new Date('2021-06-11') },
    };
    static musicPlayer: IAppletFile = {
        id: 1.10,
        parentId: 1.10,
        name: LocaleKey.musicPlayer,
        appletType: AppletType.musicPlayer,
        type: FileType.applet,
        info: { version: '62.548.1', size: 98, installedOn: new Date('2021-06-27') },
    };
    static email: IAppletFile = {
        id: 1.11,
        parentId: 1.11,
        name: LocaleKey.email,
        appletType: AppletType.email,
        type: FileType.applet,
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    static monitor: IAppletFile = {
        id: 1.12,
        parentId: 1.12,
        name: LocaleKey.monitor,
        appletType: AppletType.monitor,
        type: FileType.applet,
        meta: { key: "monitor-iframe", src: getIframeUrl({ appletType: AppletType.monitor } as any) },
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    static liveTv: IAppletFile = {
        id: 1.14,
        parentId: 1.14,
        name: LocaleKey.liveTv,
        appletType: AppletType.liveTv,
        type: FileType.applet,
        info: { version: '0.44.4', size: 3751, installedOn: new Date('2021-07-12'), updatedOn: new Date('2021-07-12') },
    };
    static twitterTimeline: IAppletFile = {
        id: 1.15,
        parentId: 1.15,
        name: LocaleKey.twitterFeed,
        appletType: AppletType.tweeter,
        type: FileType.applet,
        info: { version: '0.3.4', size: 191, installedOn: new Date('2021-07-19') },
    };
}

export const allKnownApps = (): Array<IAppletFile> => {
    const apps: Array<IAppletFile> = [];
    for (const appletProp in KnownApplets) {
        if (Object.prototype.hasOwnProperty.call(KnownApplets, appletProp)) {
            const applet: IAppletFile = (KnownApplets as any)[appletProp];
            if (appletsHiddenFromApplicationFolder.includes(applet.appletType)) continue;
            apps.push(applet);
        }
    }
    return apps;
}

export const numAllowedInstances = (appletType: AppletType): number => {
    for (const applet of allKnownApps()) {
        if (applet.appletType === appletType) return applet.numAllowedInstances ?? 1;
    }
    return 1;
}
