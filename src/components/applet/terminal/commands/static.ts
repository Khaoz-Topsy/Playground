export const staticList = {
    contact: {
        description: 'Get my contact information.',
        list: [
            {
                type: 'info',
                label: 'Email:',
                content: 'hi@kurtlourens.com'
            },
            {
                type: 'info',
                label: 'Github:',
                content: 'https://github.com/khaoz-topsy'
            },
            {
                type: 'info',
                label: 'Twitter:',
                content: 'https://twitter.com/khaoztopsy'
            },
            {
                type: 'info',
                label: 'blog:',
                content: 'https://blog.kurtlourens.com'
            },
        ]
    },
    current: {
        description: 'Get my contact information.',
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
    whoami: {
        description: 'Returns information on the current user',
        list: [
            {
                type: 'success',
                label: 'Compiled',
                content: '1   const'
            },
            {
                type: 'success',
                label: 'Compiled',
                content: '2     tomatoes = "番茄",'
            },
            {
                type: 'success',
                label: 'Compiled',
                content: '3     tomotoes = "坏掉的番茄";'
            },
            {
                type: 'success',
                label: 'Compiled',
                content: '4   const myTomotoes = new Promise((resolve, reject) => {'
            },
            {
                type: 'warning',
                label: 'Compiled',
                content: '5     tomatoes === "番茄"?resolve(tomotoes):reject(tomatoes)'
            },
            {
                type: 'success',
                label: 'Compiled',
                content: '6   }).then(()=>"My tomatoes,I\'m coming!")'
            },
            {
                type: 'error',
                label: 'SyntaxError',
                content: '7   .catch(()=>"What the f*ck!");'
            }
        ]
    },
    skill: {
        description: 'Return a list of my skills and my rating of them.',
        list: [
            { type: 'success', label: 'A', content: '· JavaScript 99/100' },
            { type: 'success', label: 'A', content: '· Go 90/100' },
            { type: 'success', label: 'A', content: '· Java 80/100' },
            { type: 'success', label: 'A', content: '· Kotlin 80/100' },

            { type: 'warning', label: 'B', content: '· TypeScript 70/100' },
            { type: 'warning', label: 'B', content: '· Python 70/100' },
            { type: 'warning', label: 'B', content: '· C 70/100' },
            { type: 'warning', label: 'B', content: '· Shell 70/100' },

            { type: 'error', label: 'C', content: '· C# 60/100' },
            { type: 'error', label: 'C', content: '· Rust 60/100' },
            { type: 'error', label: 'C', content: '· Scala 60/100' },
            { type: 'error', label: 'C', content: '· Lua 60/100' },
            { type: 'error', label: 'C', content: '· Haskell 60/100' },
            { type: 'error', label: 'C', content: '· Ruby 60/100' },

            { type: 'black', label: 'D', content: '· CSS -999/100' }
        ]
    },
}