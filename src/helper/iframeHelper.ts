import { site } from '../constants/site';
import { AppletType } from '../constants/enum/appletType';
import { DocumentFile } from '../constants/documentFile';

interface IBaseIframeRequirements {
    appletType: AppletType;
    imgUrl?: string;
    meta?: any;
}

export const getIframeUrl = (applet: IBaseIframeRequirements | undefined): string | null => {
    if (applet == null) return null;

    if (applet?.meta?.src != null) return applet.meta.src;
    if (applet.appletType === AppletType.iframe) return applet.meta.src;

    if (applet.appletType === AppletType.kurt) return site.kurt.website;
    if (applet.appletType === AppletType.monitor) return site.kurt.monitor;
    if (applet.appletType === AppletType.minecraft) return 'https://classic.minecraft.net/';
    if (applet.appletType === AppletType.presentation) return site.kurt.presentation;
    if (applet.appletType === AppletType.assistantSMS) return site.assistantApps.sms.webapp;
    if (applet.appletType === AppletType.assistantNMS) return site.assistantApps.nms.webapp;
    if (applet.appletType === AppletType.iotPublication) return DocumentFile.iotPublications;
    if (applet.appletType === AppletType.musicPlayer) return site.kurt.spotifyPublicLikedSongs;
    if (applet.appletType === AppletType.nyanCat) return 'https://cristurm.github.io/nyan-cat/';
    if (applet.appletType === AppletType.digdug) return 'https://v6p9d9t4.ssl.hwcdn.net/html/1383798/index.html';
    if (applet.appletType === AppletType.diablo) return 'https://d07riv.github.io/diabloweb/';
    if (applet.appletType === AppletType.radio) return 'https://tunein.com/';

    return null;
}