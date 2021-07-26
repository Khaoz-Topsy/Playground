import { CommandEnum, ICommand, IExecutedCommand } from '../command';

export const staticList: { [key: string]: ICommand } = {
    current: {
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
    skill: {
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
