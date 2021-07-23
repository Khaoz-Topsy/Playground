export const staticList = () => ({
    current: {
        description: 'What my current goals are and what I have been up to.',
        list: [
            {
                type: 'info',
                label: '2021',
                content: 'What I have been doing:'
            },
            {
                type: 'black',
                label: ' ➜ ',
                content: '🔭 Creating a bunch of Apps and Tools for AssistantApps!'
            },
            {
                type: 'black',
                label: ' ➜ ',
                content: '🌱 Getting really good at Flutter.'
            },
            {
                type: 'black',
                label: ' ➜ ',
                content: 'Creating another app for the AssistantApps group.'
            },
        ]
    },
    skill: {
        description: 'Return a list of my skills and my rating of them.',
        list: [
            { type: 'success', label: 'A', content: '· JavaScript / Typescript' },
            { type: 'success', label: 'A', content: '· C#' },
            { type: 'success', label: 'A', content: '· ASP.NET Core' },
            { type: 'success', label: 'A', content: '· Flutter' },
            { type: 'success', label: 'A', content: '· React' },
            { type: 'success', label: 'A', content: '· SASS + CSS' },

            { type: 'warning', label: 'B', content: '· PWA' },
            { type: 'warning', label: 'B', content: '· Angular' },
            { type: 'warning', label: 'B', content: '· Azure DevOps' },
            { type: 'warning', label: 'B', content: '· CodeMagic.io' },

            { type: 'error', label: 'C', content: '· MSSQL' },
            { type: 'error', label: 'C', content: '· React Native' },
            { type: 'error', label: 'C', content: '· Xamarin' },
            { type: 'error', label: 'C', content: '· Arduino' },
        ]
    },
});
