import { IReactTerminalPrintProps } from '../../../../contracts/terminal';
import { currentMediumTime } from '../../../../helper/dateHelper';
import { getFunnyMessages } from '../../../../helper/funnyLoadingMessagesHelper';
import { cowMessageAsArray } from '../../../../helper/cowHelper';
import { VirtualAssistantService } from '../../../../services/VirtualAssistantService';
import { site } from '../../../../constants/site';
import { openExternal } from '../../../../helper/linkHelper';

interface IProps {
    virtualAssistantService: VirtualAssistantService;
    clippyIsEnabled: boolean;
    enableClippy: (enabled: boolean) => void;
}

export const dynamicListFunc = (props: IProps) => {
    return {
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
                            setTimeout(() => {
                                resolve(introduction[i]);
                                props.virtualAssistantService.play('GetAttention');
                            }, 1000);
                        }
                    }, 1000);
                })
            }
        },
        clippy: {
            description: 'Enable or disable Clippy. type `clippy true|false`.',
            run(print: any, input: any) {
                return new Promise(resolve => {
                    let newValue: boolean = !props.clippyIsEnabled;
                    // eslint-disable-next-line
                    if (input == 'false' || input == 'f' || input == false) {
                        newValue = false;
                    }
                    props.enableClippy(newValue);
                    if (newValue) {
                        props.virtualAssistantService?.show?.();
                    } else {
                        props.virtualAssistantService?.hide?.();
                    }

                    resolve({
                        time: currentMediumTime(),
                        label: 'clippy',
                        type: 'success',
                        content: newValue ? 'Enabled' : 'Disabled',
                    });
                })
            }
        },
        cow: {
            description: 'Outputs a message with an ASCII cow',
            run(print: any, input: any) {
                return new Promise((resolve) => {
                    const cowArray: Array<string> = cowMessageAsArray(input);
                    for (let cowIndex = 0; cowIndex < cowArray.length; cowIndex++) {
                        print(cowArray[cowIndex]);
                    }
                    resolve('');
                });
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
                    });
                    resolve({ type: 'success', label: '', content: '' });
                })
            }
        },
        open: {
            description: 'Open a specified url in a new tab.',
            run(print: any, input: any) {
                return new Promise((resolve) => {
                    if (!input) {
                        resolve({ type: 'error', label: 'Error', content: 'a url is required!' });
                        return;
                    }
                    if (!input.startsWith('http')) {
                        resolve({ type: 'error', label: 'Error', content: 'Please add `http` prefix!' });
                        return;
                    }
                    print({ type: 'success', label: 'Success', content: 'Opening' });

                    openExternal(input);
                    resolve({ type: 'success', label: 'Done', content: 'Page Opened!' });
                });
            }
        },
        blog: {
            description: 'Open my blog in a new tab.',
            run(print: any) {
                return new Promise((resolve) => {
                    print({ type: 'success', label: 'Success', content: 'Opening' });

                    openExternal(site.kurt.blog);
                    resolve({ type: 'success', label: 'Done', content: ':)' });
                })
            }
        },
        resume: {
            description: 'Open my resume in a new tab.',
            run(print: any) {
                return new Promise((resolve) => {
                    print({ type: 'success', label: 'Success', content: 'Opening' });

                    openExternal('https://tomotoes.com/blog/resume');
                    resolve({ type: 'success', label: 'Done', content: ':)' });
                })
            }
        },
    }
}