import { IReactTerminalPrintProps } from '../../../../contracts/terminal';
import { currentMediumTime } from '../../../../helper/dateHelper';
import { getFunnyMessages } from '../../../../helper/funnyLoadingMessagesHelper';

export const dynamicList = {
    intro: {
        description: 'Introducting myself again.',
        run(print: (printProps: string | IReactTerminalPrintProps) => void) {
            let i = 0
            const funnyMessages = getFunnyMessages(3);
            const introduction: Array<string | IReactTerminalPrintProps> = [
                `Welcome to Kurt's Terminal`,
                ...funnyMessages.map(funny => ({
                    type: 'info',
                    label: 'Loading',
                    content: funny,
                })),
                {
                    type: 'success',
                    label: 'Success',
                    content: 'Successfully loaded!',
                }
            ];
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    try {
                        print(introduction[i]);
                    } catch (ex) {
                        clearInterval(interval);
                        return;
                    }
                    i++
                    if ((i + 1) >= introduction.length) {
                        clearInterval(interval);
                        setTimeout(() => resolve(introduction[i]), 1000);
                    }
                }, 1000)
            })
        }
    },
    echo: {
        description: 'Echoes input.',
        run(print: any, input: any) {
            return new Promise(resolve => {
                print({
                    time: currentMediumTime(),
                    label: 'Echo',
                    type: 'success',
                    content: input
                })
                resolve({ type: 'success', label: '', content: '' })
            })
        }
    },
    open: {
        description: 'Open a specified url in a new tab.',
        run(print: any, input: any) {
            return new Promise((resolve) => {
                if (!input) {
                    resolve({ type: 'error', label: 'Error', content: 'a url is required!' })
                    return
                }
                if (!input.startsWith('http')) {
                    resolve({ type: 'error', label: 'Error', content: 'Please add `http` prefix!' })
                    return
                }
                print({ type: 'success', label: 'Success', content: 'Opening' })

                window.open(input, '_blank')
                resolve({ type: 'success', label: 'Done', content: 'Page Opened!' })
            })
        }
    },
    blog: {
        description: 'Open my blog in a new tab.',
        run(print: any) {
            return new Promise((resolve) => {
                print({ type: 'success', label: 'Success', content: 'Opening' })

                window.open('https://tomotoes.com/blog', '_blank')
                resolve({ type: 'success', label: 'Done', content: ':)' })
            })
        }
    },
    resume: {
        description: 'Open my resume in a new tab.',
        run(print: any) {
            return new Promise((resolve) => {
                print({ type: 'success', label: 'Success', content: 'Opening' })

                window.open('https://tomotoes.com/blog/resume', '_blank')
                resolve({ type: 'success', label: 'Done', content: ':)' })
            })
        }
    },
    2048: {
        description: 'Open a 2048 Game in a new tab.',
        run(print: any) {
            return new Promise((resolve) => {
                print({ type: 'success', label: 'Success', content: 'Opening' })

                window.open('https://tomotoes.com/2048', '_blank')
                resolve({ type: 'success', label: 'Done', content: 'Game Start!' })
            })
        }
    }
}