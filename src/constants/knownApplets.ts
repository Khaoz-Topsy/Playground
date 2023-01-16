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
        numAllowedInstances: 3,
        info: { version: '12.71', size: 55, installedOn: new Date('2021-06-23'), updatedOn: new Date('2021-07-26') },
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
        info: { version: '0.3.4', size: 20, installedOn: new Date('2021-06-04'), author: 'Cristina Sturm', projectUrl: 'https://cristurm.github.io/nyan-cat/' },
    };
    static notes: IAppletFile = {
        id: 1.05,
        parentId: 1.05,
        name: LocaleKey.notes,
        appletType: AppletType.notes,
        type: FileType.applet,
        numAllowedInstances: 5,
        info: { version: '0.2.3', size: 700, installedOn: new Date('2021-06-20'), updatedOn: new Date('2021-07-19') },
    };
    static terminal: IAppletFile = {
        id: 1.06,
        parentId: 1.06,
        name: LocaleKey.terminal,
        appletType: AppletType.terminal,
        type: FileType.applet,
        info: { version: '1.6.8', size: 5341, installedOn: new Date('2021-06-14'), },
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
    static noMansSky: IAppletFile = {
        id: 1.09,
        parentId: 1.09,
        name: LocaleKey.assistantNMS,
        appletType: AppletType.assistantNMS,
        type: FileType.applet,
        info: { version: '0.3.18', size: 3598, installedOn: new Date('2021-07-21') },
    };
    static scrapMechanic: IAppletFile = {
        id: 1.10,
        parentId: 1.10,
        name: LocaleKey.assistantSMS,
        appletType: AppletType.assistantSMS,
        type: FileType.applet,
        info: { version: '0.5.1', size: 5907, installedOn: new Date('2021-06-11') },
    };
    static musicPlayer: IAppletFile = {
        id: 1.11,
        parentId: 1.11,
        name: LocaleKey.musicPlayer,
        appletType: AppletType.musicPlayer,
        type: FileType.applet,
        info: { version: '62.548.1', size: 98, installedOn: new Date('2021-06-27') },
    };
    static email: IAppletFile = {
        id: 1.12,
        parentId: 1.12,
        name: LocaleKey.email,
        appletType: AppletType.email,
        type: FileType.applet,
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    static monitor: IAppletFile = {
        id: 1.14,
        parentId: 1.14,
        name: LocaleKey.monitor,
        appletType: AppletType.monitor,
        type: FileType.applet,
        meta: { key: 'monitor-iframe', src: getIframeUrl({ appletType: AppletType.monitor } as any) },
        info: { version: '0.0.4', size: 342, installedOn: new Date('2021-06-28') },
    };
    static liveTv: IAppletFile = {
        id: 1.15,
        parentId: 1.15,
        name: LocaleKey.liveTv,
        appletType: AppletType.liveTv,
        type: FileType.applet,
        info: { version: '0.44.4', size: 3751, installedOn: new Date('2021-07-12'), updatedOn: new Date('2021-07-12') },
    };
    static twitterTimeline: IAppletFile = {
        id: 1.16,
        parentId: 1.16,
        name: LocaleKey.twitterFeed,
        appletType: AppletType.tweeter,
        type: FileType.applet,
        info: { version: '0.3.4', size: 191, installedOn: new Date('2021-07-19') },
    };
    static iotPublication: IAppletFile = {
        id: 1.17,
        parentId: 1.17,
        name: LocaleKey.iotPublication,
        appletType: AppletType.iotPublication,
        type: FileType.applet,
        meta: { key: 'iotPublication-iframe', src: getIframeUrl({ appletType: AppletType.iotPublication } as any) },
        info: { version: '1.0.0', size: 191, installedOn: new Date('2021-07-20') },
    };
    static presentation: IAppletFile = {
        id: 1.18,
        parentId: 1.18,
        name: LocaleKey.presentation,
        appletType: AppletType.presentation,
        type: FileType.applet,
        info: { version: '0.0.5', size: 5043, installedOn: new Date('2021-07-21') },
    };
    static swagger: IAppletFile = {
        id: 1.19,
        parentId: 1.19,
        name: LocaleKey.apiDocs,
        appletType: AppletType.swagger,
        type: FileType.applet,
        info: { version: '0.0.1', size: 100, installedOn: new Date('2021-07-26') },
    };
    static yellowPages: IAppletFile = {
        id: 1.20,
        parentId: 1.20,
        name: LocaleKey.yellowPages,
        appletType: AppletType.yellowPages,
        type: FileType.applet,
        info: { version: '0.2.23', size: 55, installedOn: new Date('2021-07-26') },
    };
    static browser: IAppletFile = {
        id: 1.21,
        parentId: 1.21,
        name: LocaleKey.browser,
        appletType: AppletType.browser,
        type: FileType.applet,
        info: { version: '0.0.1', size: 8071, installedOn: new Date('2021-07-28') },
    };
    static paint: IAppletFile = {
        id: 1.22,
        parentId: 1.22,
        name: LocaleKey.paint,
        appletType: AppletType.paint,
        type: FileType.applet,
        info: { version: '1509.432.1', size: 371, installedOn: new Date('2022-04-01'), author: 'leftstick', projectUrl: 'https://github.com/leftstick/react-do-painting' },
    };
    static minecraft: IAppletFile = {
        id: 1.30,
        parentId: 1.30,
        name: LocaleKey.minecraft,
        appletType: AppletType.minecraft,
        type: FileType.applet,
        info: { version: '62.548.1', size: 98, installedOn: new Date('2022-02-11') },
    };
    static diablo: IAppletFile = {
        id: 1.31,
        parentId: 1.31,
        name: LocaleKey.diablo,
        appletType: AppletType.diablo,
        type: FileType.applet,
        info: { version: '78.3.1', size: 98, installedOn: new Date('2022-03-29') },
    };
    static modelViewer: IAppletFile = {
        id: 1.32,
        parentId: 1.32,
        name: LocaleKey.modelViewer,
        appletType: AppletType.modelViewer,
        type: FileType.model,
        info: { version: '0.0.29', size: 840, installedOn: new Date('2022-06-27') },
    };
    static radio: IAppletFile = {
        id: 1.33,
        parentId: 1.33,
        name: LocaleKey.radio,
        appletType: AppletType.radio,
        type: FileType.applet,
        info: { version: '2.0.1', size: 4286, installedOn: new Date('2022-06-27') },
    };
    static digDug: IAppletFile = {
        id: 1.34,
        parentId: 1.34,
        name: LocaleKey.digdug,
        appletType: AppletType.digdug,
        type: FileType.applet,
        info: { version: '1.0.4', size: 8173, installedOn: new Date('2022-07-13'), author: 'Turtled', projectUrl: 'https://turtled.itch.io/dig-dug' },
    };
    static powerPrezz: IAppletFile = {
        id: 1.35,
        parentId: 1.35,
        name: LocaleKey.powerPrezz,
        appletType: AppletType.powerPrezz,
        type: FileType.applet,
        numAllowedInstances: 3,
        info: { version: '0.0.1', size: 503, installedOn: new Date('2022-12-06') },
    };
    static screenshare: IAppletFile = {
        id: 1.36,
        parentId: 1.36,
        name: LocaleKey.screenshare,
        appletType: AppletType.screenshare,
        type: FileType.applet,
        numAllowedInstances: 3,
        info: { version: '17.0.1', size: 208541, installedOn: new Date('2022-12-13') },
    };
}

export const allKnownApps = (): Array<IAppletFile> => {
    const apps: Array<IAppletFile> = [];
    for (const appletProp in KnownApplets) {
        if (Object.prototype.hasOwnProperty.call(KnownApplets, appletProp)) {
            const applet: IAppletFile = (KnownApplets as any)[appletProp];
            apps.push(applet);
        }
    }
    return apps;
}

export const allVisibleApps = (): Array<IAppletFile> => {
    const apps: Array<IAppletFile> = [];
    const allKnownAppsArr = allKnownApps();
    for (const applet of allKnownAppsArr) {
        if (appletsHiddenFromApplicationFolder.includes(applet.appletType)) continue;
        apps.push(applet);
    }
    return apps;
}

export const numAllowedInstances = (appletType: AppletType): number => {
    for (const applet of allKnownApps()) {
        if (applet.appletType === appletType) return applet.numAllowedInstances ?? 1;
    }
    return 1;
}
