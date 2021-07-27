import React from 'react';
import { Terminal } from './terminalWindow';
import { useToast } from '@chakra-ui/react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { withServices } from '../../../integration/dependencyInjection';
import { SettingStore } from '../../../state/setting/store';
import { SecretStore } from '../../../state/secrets/store';
import { closeApp } from '../../../state/window/reducer';
import { WindowStore } from '../../../state/window/store';

import { IExpectedServices, dependencyInjectionToProps } from './terminalApplet.dependencyInjection';
import { allKnownApps } from '../../../constants/knownApplets';
import { AppletType } from '../../../constants/enum/appletType';
import { CommandEnum, IExecutedCommand } from '../../../contracts/interface/ICommand';
import { staticList } from './commands/static';
import { addSecretIfNotFound } from '../../../helper/secretFoundHelper';
import { FoundSecretType } from '../../../constants/enum/foundSecretType';
import { cowMessageAsArray } from '../../../helper/cowHelper';

interface IWithoutExpectedServices { }
interface IProps extends IApplet, IWithoutExpectedServices, IExpectedServices { }

export const TerminalAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    let info: any = allKnownApps().find(app => app.appletType === AppletType.terminal)?.info;

    const config = {
        prompt: '➜ ',
        user: 'kurt.lourens',
        version: info?.version ?? '0.0.1',
        folderStructure: props.folderStructure,
    }

    const commands = {
        exit: {
            sortOrder: 99,
            descrip: 'Type "exit" to closse the terminal.',
            aliasList: ['kill', 'back'],
            run: async () => WindowStore.update(closeApp(props.guid)),
        },
        ...staticList,
        clippy: {
            sortOrder: 18,
            descrip: 'Enable or disable Clippy. type `clippy true|false`.',
            run: async (printer: (cmd: IExecutedCommand) => void, inputCommand?: string) => {
                let newValue: boolean = !currentSettings.enabledClippy;
                // eslint-disable-next-line
                if (inputCommand == 'true') {
                    newValue = true;
                }
                // eslint-disable-next-line
                if (inputCommand == 'false') {
                    newValue = false;
                }
                SettingStore.update(store => {
                    store.enabledClippy = newValue;
                    return;
                })
                if (newValue) {
                    props.virtualAssistantService?.show?.();

                    addSecretIfNotFound({
                        secretStore: SecretStore,
                        currentSecretsFound: currentSecretsFound,
                        secretToAdd: FoundSecretType.asciiCow,
                        toastFunc: toastFunc,
                    });
                } else {
                    props.virtualAssistantService?.hide?.();
                }

                printer({
                    tag: 'Clippy',
                    type: CommandEnum.SystemSuccess,
                    value: newValue ? 'Enabled' : 'Disabled',
                });
            }
        },
        cow: {
            sortOrder: 17,
            type: CommandEnum.SystemSuccess,
            descrip: 'Outputs a message with an ASCII cow',
            run: async (printer: (cmd: IExecutedCommand) => void) => {
                const cowArray: Array<string> = cowMessageAsArray('hi');
                for (let cowIndex = 0; cowIndex < cowArray.length; cowIndex++) {
                    printer({
                        type: CommandEnum.SystemInfo,
                        value: cowArray[cowIndex],
                    });
                }
                addSecretIfNotFound({
                    secretStore: SecretStore,
                    currentSecretsFound: currentSecretsFound,
                    secretToAdd: FoundSecretType.asciiCow,
                    toastFunc: toastFunc,
                });
            }
        },
    };

    return (
        <Applet
            {...props}
            classNames="terminal"
            isFullscreen={true}
        >
            <Terminal {...config} commands={commands} />
        </Applet>
    );
}

export const TerminalApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    TerminalAppletUnconnected,
    dependencyInjectionToProps
);
