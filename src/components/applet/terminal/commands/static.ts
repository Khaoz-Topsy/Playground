import { site } from '../../../../constants/site';
import { openExternalInNewTab } from '../../../../helper/linkHelper';
import { CommandEnum, ICommand, IExecutedCommand } from '../../../../contracts/interface/ICommand';
import { translate } from '../../../../integration/i18n';
import { LocaleKey } from '../../../../localization/LocaleKey';

const cleanUrl = (url: string) => {
    return url.replace('http://', '').replace('https://', '');
}

export const staticList: { [key: string]: ICommand } = {
    blog: {
        sortOrder: 10,
        descrip: 'Open my blog in a new tab.',
        run: async (printer: (cmd: IExecutedCommand) => void, inputCommand?: string) => {
            printer({
                tag: 'Success',
                type: CommandEnum.SystemInfo,
                value: 'Opening...',
            });

            openExternalInNewTab(site.kurt.blog);
            printer({
                tag: 'Done',
                type: CommandEnum.SystemSuccess,
                value: '🎉',
            });
        }
    },
    current: {
        sortOrder: 12,
        descrip: 'What my current goals are and what I have been up to.' as any,
        run: async (print: (cmd: IExecutedCommand) => void) => {
            const list = [
                {
                    label: (new Date()).getFullYear().toString(),
                    content: 'What I have been doing:'
                },
                {
                    label: ' ➜ ',
                    content: '🔭 Creating a bunch of Apps and Tools for AssistantApps!'
                },
                {
                    label: ' ➜ ',
                    content: '🌱 Getting really good at Flutter.'
                },
                {
                    label: ' ➜ ',
                    content: 'Creating another app for the AssistantApps group.'
                },
            ];

            for (const listItem of list) {
                print({
                    type: CommandEnum.SystemInfo,
                    tag: listItem.label,
                    value: listItem.content,
                });
            }
        },
    },
    contact: {
        sortOrder: 14,
        descrip: 'Get my contact information.',
        run: async (printer: (cmd: IExecutedCommand) => void) => {
            printer({
                tag: 'Email',
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.email),
                onClick: () => openExternalInNewTab(`mailto:${site.kurt.email}`),
            });
            printer({
                tag: translate(LocaleKey.github),
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.github),
                onClick: () => openExternalInNewTab(site.kurt.github),
            });
            printer({
                tag: 'Twitter',
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.twitter),
                onClick: () => openExternalInNewTab(site.kurt.twitter),
            });
            printer({
                tag: 'Twitch',
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.twitch),
                onClick: () => openExternalInNewTab(site.kurt.twitch),
            });
            printer({
                tag: 'LinkedIn',
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.linkedin),
                onClick: () => openExternalInNewTab(site.kurt.linkedin),
            });
            printer({
                tag: 'Steam',
                type: CommandEnum.Link,
                value: cleanUrl(site.kurt.steam),
                onClick: () => openExternalInNewTab(site.kurt.steam),
            });
            printer({
                tag: 'Discord',
                type: CommandEnum.SystemInfo,
                value: site.kurt.discord,
            });
        },
    },
    skill: {
        sortOrder: 20,
        descrip: 'Return a list of my skills and my rating of them.',
        run: async (print: (cmd: IExecutedCommand) => void) => {
            const list = [
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· JavaScript / Typescript' },
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· C#' },
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· ASP.NET Core' },
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· Flutter' },
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· React' },
                { type: CommandEnum.SystemSuccess, label: 'A', content: '· SASS + CSS' },

                { type: CommandEnum.SystemWarning, label: 'B', content: '· PWA' },
                { type: CommandEnum.SystemWarning, label: 'B', content: '· Angular' },
                { type: CommandEnum.SystemWarning, label: 'B', content: '· Azure DevOps' },
                { type: CommandEnum.SystemWarning, label: 'B', content: '· CodeMagic.io' },

                { type: CommandEnum.SystemDanger, label: 'C', content: '· MSSQL' },
                { type: CommandEnum.SystemDanger, label: 'C', content: '· React Native' },
                { type: CommandEnum.SystemDanger, label: 'C', content: '· Xamarin' },
                { type: CommandEnum.SystemDanger, label: 'C', content: '· Arduino' },
            ];

            for (const listItem of list) {
                print({
                    type: listItem.type,
                    tag: listItem.label,
                    value: listItem.content,
                });
            }
        },
    },
};
