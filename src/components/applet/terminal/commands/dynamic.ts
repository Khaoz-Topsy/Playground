import { site } from '../../../../constants/site';
import { FoundSecretType } from '../../../../constants/enum/foundSecretType';
import { IReactTerminalPrintProps } from '../../../../contracts/terminal';
import { currentMediumTime } from '../../../../helper/dateHelper';
import { getFunnyMessages } from '../../../../helper/funnyLoadingMessagesHelper';
import { cowMessageAsArray } from '../../../../helper/cowHelper';
import { openExternalInNewTab } from '../../../../helper/linkHelper';
import { addSecretIfNotFound } from '../../../../helper/secretFoundHelper';
import { VirtualAssistantService } from '../../../../services/VirtualAssistantService';
import { Store } from 'pullstate';
import { ISecretStore } from '../../../../state/secrets/store';

interface IProps {
    virtualAssistantService: VirtualAssistantService;
    clippyIsEnabled: boolean;

    secretStore: Store<ISecretStore>;
    currentSecretsFound: Array<FoundSecretType>;
    toastFunc: (opts: any) => void;
    enableClippy: (enabled: boolean) => void;
}

export const dynamicListFunc = (props: IProps) => {
    return {
        contact: {
            description: 'Get my contact information.',
            run(print: (printProps: string | IReactTerminalPrintProps) => void) {

                return new Promise(resolve => {
                    resolve('over');
                })
            },
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
                    addSecretIfNotFound({
                        secretStore: props.secretStore,
                        currentSecretsFound: props.currentSecretsFound,
                        secretToAdd: FoundSecretType.asciiCow,
                        toastFunc: props.toastFunc,
                    });
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

                    openExternalInNewTab(input);
                    resolve({ type: 'success', label: 'Done', content: 'Page Opened!' });
                });
            }
        },
        blog: {
            description: 'Open my blog in a new tab.',
            run(print: any) {
                return new Promise((resolve) => {
                    print({ type: 'success', label: 'Success', content: 'Opening' });

                    openExternalInNewTab(site.kurt.blog);
                    resolve({ type: 'success', label: 'Done', content: ':)' });
                })
            }
        },
    }
}