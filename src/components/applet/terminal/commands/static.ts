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
        description: 'Return a piece of code about tomotoes.',
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
    cartoon: {
        description: 'Return a list of cartoons that I have watched.',
        list: [
            ' 《 海绵宝宝 》',
            ' 《 瑞克与莫蒂 》',
            ' 《 一人之下 》',
            ' 《 镇魂街 》',
            ' 《 一拳超人 》',
            ' 《 某科学的超电磁炮 》',
            ' 《 罗小黑战记 》',
            ' 《 鬼灭之刃 》',
            ' 《 辉夜大小姐想让我告白 》',
            ' 《 笨女孩 》',
            ' 《 埃罗芒阿老师 》',
            ' 《 Charlotte 》',
            ' 《 灵笼 》',
            ' 《  干物妹！小埋 》',
            ' 《 这个勇者明明超强却过分慎重 》'
        ]
    },
    book: {
        description: 'Return a list of books that I have read.',
        list: [
            ' 《 JavaScript 高级程序设计 》--- Nicholas C.Zakas ',
            ' 《 JavaScript 标准参考教程 》--- 阮一峰 ',
            ' 《 ECMAScript 6 入门 》--- 阮一峰 ',
            ' 《 JavaScript DOM 高级程序编程艺术 》--- Jeremy Keith ',
            ' 《 锋利的 jQuery 》--- 单东林 ',
            ' 《 CSS 揭秘 》--- LEA VEROU ',
            ' 《 CSS 权威指南 》--- Eric A.Meyer ',
            ' 《 HTML5 高性能指南 》--- 布莱恩特/琼斯 ',
            ' 《 C# 本质论 》--- MarkMichaelis ',
            ' 《 C# 入门经典 2015 》--- karli ',
            ' 《 C# 多线程编程实战 》--- 阿格佛温 ',
            ' 《 C primer plus(第六版) 》--- Stephen Prata ',
            ' 《 算法导论 》--- Thomas H.Cormen... ',
            ' 《 算法竞赛入门经典(第一版) 》--- 刘汝佳 ',
            ' 《 算法竞赛入门经典(第二版) 》--- 刘汝佳 ',
            ' 《 Vim 实战技巧 》--- Drew Neil ',
            ' 《 你不知道的 JavaScript-下 》--- Kyle Simpson ',
            ' 《 Linux 命令行大全 》--- William E.shotts，Jr ',
            ' 《 写给大忙人看的 Java 核心技术 》--- CayS.Horstmann ',
            ' 《 Python Cookbook 》--- Alex Martelli... ',
            ' 《 暗时间 》--- 刘未鹏 ',
            '  《 Haskell 趣学指南 》--- 斯洛文尼亚 ',
            ' 《 数学之美（第二版） 》--- 吴军 ',
            ' 《 Linux Bash 编程与脚本应用实战 》--- 马玉军 郝军 ',
            ' 《 程序员的呐喊 》--- Steve Yegge ',
            ' 《 The way to go 》--- 无闻 ',
            ' 《 The Go Programming Language 》--- Brian W. Kernighan... ',
            ' 《 Java 编程思想 （第4版） 》--- Bruce Eckel ',
            ' 《 Kotlin 核心编程 》--- 水滴团队 ',
            ' 《 Easy Kotlin 》--- JackChan ',
            ' 《 HTTP 图解 》--- 上野宣 ',
            '《 刘大猫的财富之旅 》--- 刘欣 ',
            '《 ZOO 》--- 乙一 '
        ]
    }
}