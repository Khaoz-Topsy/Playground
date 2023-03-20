import { site } from "../../../constants/site"
import { translate } from "../../../integration/i18n"
import { LocaleKey } from "../../../localization/LocaleKey"

export interface IYellowPagesGroup {
    name: LocaleKey,
    pages: Array<IYellowPage>;
}

export interface IYellowPage {
    name: string;
    description: string;
    url: string;
}

export const YellowPagesList = (): Array<IYellowPagesGroup> => {
    return [
        {
            name: LocaleKey.assistantApps,
            pages: [
                {
                    name: 'Homepage',
                    description: '',
                    url: site.assistantApps.website,
                },
                {
                    name: 'API documentation (Swagger)',
                    description: '',
                    url: site.assistantApps.api,
                },
                // {
                //     name: 'Admin dashboard',
                //     description: '',
                //     url: 'https://admin.assistantapps.com',
                // },
                {
                    name: 'Translation Tool',
                    description: '',
                    url: site.assistantApps.tools,
                },
                {
                    name: 'Documentation',
                    description: '',
                    url: 'https://docs.assistantapps.com',
                },
                {
                    name: 'Web Components',
                    description: '',
                    url: 'https://webcomp.assistantapps.com',
                },
                {
                    name: 'Stream Toys',
                    description: '',
                    url: 'https://stream.assistantapps.com',
                },
                {
                    name: 'Crazy Chat Overlay',
                    description: '',
                    url: 'https://assistantapps.github.io/Crazy-Chat-Overlay/',
                },
            ]
        },
        {
            name: LocaleKey.assistantNMS,
            pages: [
                {
                    name: 'API documentation (Swagger)',
                    description: '',
                    url: site.assistantApps.nms.api,
                },
                {
                    name: 'Homepage',
                    description: '',
                    url: site.assistantApps.nms.website,
                },
                {
                    name: 'WebApp',
                    description: '',
                    url: site.assistantApps.nms.webapp,
                },
                {
                    name: 'WebComponents',
                    description: '',
                    url: site.assistantApps.nms.webcomp,
                },
                {
                    name: 'API Admin dashboard',
                    description: '',
                    url: site.assistantApps.nms.webTools,
                },
                {
                    name: 'Github Org',
                    description: '',
                    url: site.assistantApps.nms.github,
                },
                {
                    name: 'APK hosting site',
                    description: '',
                    url: site.assistantApps.nms.apk,
                },
            ]
        },
        {
            name: 'NMSCD' as any,
            pages: [
                {
                    name: 'Homepage',
                    description: '',
                    url: site.assistantApps.nms.nmscd.website,
                },
                {
                    name: 'Community Mission Progress Viewer',
                    description: '',
                    url: site.assistantApps.nms.nmscd.communityMissionProgressViewer,
                },
                {
                    name: 'Expedition Alphabet',
                    description: '',
                    url: site.assistantApps.nms.nmscd.expeditionAlphabet,
                },
                {
                    name: 'AtlasPass',
                    description: '',
                    url: site.assistantApps.nms.nmscd.atlasPass,
                },
                {
                    name: 'Community Search',
                    description: '',
                    url: site.assistantApps.nms.nmscd.communitySearch,
                },
                {
                    name: 'HG API Status',
                    description: '',
                    url: site.assistantApps.nms.nmscd.status,
                },
                {
                    name: 'NMS Update Status',
                    description: '',
                    url: site.assistantApps.nms.nmscd.update,
                },
                {
                    name: 'More NMSCD Projects',
                    description: '',
                    url: site.assistantApps.nms.nmscd.projectsList,
                },
            ]
        },
        {
            name: 'NoMansSky.Social' as any,
            pages: [
                {
                    name: 'Mastodon Instance',
                    description: '',
                    url: site.assistantApps.nms.nmssocial.website,
                },
                {
                    name: 'Emoji list',
                    description: '',
                    url: site.assistantApps.nms.nmssocial.emojis,
                },
            ]
        },
        {
            name: LocaleKey.assistantSMS,
            pages: [
                {
                    name: 'API documentation (Swagger)',
                    description: '',
                    url: site.assistantApps.sms.api,
                },
                {
                    name: 'WebApp',
                    description: '',
                    url: site.assistantApps.sms.webapp,
                },
                {
                    name: 'Github Org',
                    description: '',
                    url: site.assistantApps.sms.githubOrg,
                },
            ]
        },
        {
            name: LocaleKey.assistantDKM,
            pages: [
                {
                    name: 'Homepage',
                    description: '',
                    url: site.assistantApps.dkm.homepage,
                },
                {
                    name: 'WebApp',
                    description: '',
                    url: site.assistantApps.dkm.webapp,
                },
                {
                    name: 'Github Org',
                    description: '',
                    url: site.assistantApps.dkm.githubOrg,
                },
            ]
        },
        {
            name: 'PatreonBanner' as any,
            pages: [
                {
                    name: 'Homepage',
                    description: '',
                    url: site.assistantApps.patreonBanner.website,
                },
                {
                    name: 'Twitch Extension',
                    description: '',
                    url: site.assistantApps.patreonBanner.twitch,
                },
                {
                    name: 'API documentation (Swagger)',
                    description: '',
                    url: site.assistantApps.patreonBanner.api,
                },
            ]
        },
        {
            name: LocaleKey.kurtLourens,
            pages: [
                {
                    name: translate(LocaleKey.kurtLourensCV),
                    description: '',
                    url: site.kurt.website,
                },
                {
                    name: translate(LocaleKey.blog),
                    description: '',
                    url: site.kurt.blog,
                },
                {
                    name: 'Playground',
                    description: '',
                    url: site.kurt.playground,
                },
                {
                    name: translate(LocaleKey.monitor),
                    description: '',
                    url: site.kurt.monitor,
                },
                {
                    name: 'MemeDeck',
                    description: '',
                    url: site.kurt.memedeck,
                },
                {
                    name: 'Cards Against Humanity',
                    description: '',
                    url: site.kurt.khaoznet.cah,
                },
            ]
        },
        {
            name: 'Red Ruby IT' as any,
            pages: [
                {
                    name: 'Homepage',
                    description: '',
                    url: 'https://www.redrubyit.co.za',
                },
                {
                    name: 'BTS',
                    description: '',
                    url: 'https://app.btsra.co.za',
                },
                {
                    name: 'RemoteConfigs',
                    description: '',
                    url: 'https://remoteconfigs.com',
                },
            ]
        },
        {
            name: LocaleKey.assistantHYT,
            pages: [
                {
                    name: 'API documentation (Swagger)',
                    description: '',
                    url: site.assistantApps.hyt.api,
                },
                {
                    name: 'WebApp',
                    description: '',
                    url: site.assistantApps.hyt.webapp,
                },
            ]
        },
        {
            name: LocaleKey.archived,
            pages: [
                {
                    name: 'Timeline',
                    description: '',
                    url: site.kurt.khaoznet.timeline,
                },
                {
                    name: 'LAN',
                    description: '',
                    url: site.kurt.khaoznet.lan,
                },
                {
                    name: 'IoT',
                    description: '',
                    url: site.kurt.khaoznet.iot,
                },
                {
                    name: 'Directory of websites',
                    description: '',
                    url: site.kurt.khaoznet.homepage,
                },
                {
                    name: 'PlexMedia',
                    description: '',
                    url: site.kurt.khaoznet.plexmedia,
                },
                {
                    name: 'Passport',
                    description: '',
                    url: site.kurt.khaoznet.passport,
                },
                {
                    name: 'Zooqle',
                    description: '',
                    url: site.kurt.khaoznet.zooqle,
                },
                {
                    name: 'Download',
                    description: '',
                    url: site.kurt.khaoznet.download,
                },
                {
                    name: 'TennoDex WebApp',
                    description: '',
                    url: site.tennodex.webapp,
                },
                {
                    name: 'TennoDex API documentation',
                    description: '',
                    url: site.tennodex.api,
                },
            ]
        },
    ]
}
