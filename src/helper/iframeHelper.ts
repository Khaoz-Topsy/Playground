import { site } from '../constants/site';
import { AppletType } from '../constants/enum/appletType';

interface IBaseIframeRequirements {
    appletType: AppletType;
    meta?: any;
}

export const getIframeUrl = (applet: IBaseIframeRequirements | undefined): string | null => {
    if (applet == null) return null;

    if (applet?.meta?.src != null) return applet.meta.src;
    if (applet.appletType === AppletType.iframe) return applet.meta.src;

    if (applet.appletType === AppletType.kurt) return site.kurt.website;
    if (applet.appletType === AppletType.monitor) return site.kurt.monitor;
    if (applet.appletType === AppletType.assistantSMS) return site.assistantApps.sms.webapp;
    if (applet.appletType === AppletType.assistantNMS) return site.assistantApps.nms.webapp;
    if (applet.appletType === AppletType.musicPlayer) return site.kurt.spotifyPublicLikedSongs;
    if (applet.appletType === AppletType.nyanCat) return 'https://cristurm.github.io/nyan-cat/';

    return null;
}