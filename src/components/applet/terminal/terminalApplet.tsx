import React, { useEffect } from 'react';
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
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';

interface IWithoutExpectedServices { }
interface IProps extends IApplet, IWithoutExpectedServices, IExpectedServices { }

export const TerminalAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    useEffect(() => {
        props.virtualAssistantService.say?.(translate(LocaleKey.clippyAdvancedUser));
        props.virtualAssistantService.play?.(virtualAssistantAnimations.getTechy);
        // eslint-disable-next-line
    }, []);

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
                props.virtualAssistantService.say?.(translate(LocaleKey.clippySecretFound));
                props.virtualAssistantService.play?.(virtualAssistantAnimations.congratulate);
                addSecretIfNotFound({
                    secretStore: SecretStore,
                    currentSecretsFound: currentSecretsFound,
                    secretToAdd: FoundSecretType.asciiCow,
                    toastFunc: toastFunc,
                });
            }
        },
        wttr: {
            sortOrder: 80,
            type: CommandEnum.SystemSuccess,
            descrip: 'Gets the weather forecast for your IP address',
            run: async (printer: (cmd: IExecutedCommand) => void) => {
                const wttrResult = await props.externalApiService.getWeather();
                if (wttrResult.isSuccess === false) {
                    printer({
                        type: CommandEnum.Error,
                        value: translate(LocaleKey.couldNotFetchWeatherInfo),
                    });
                    return;
                }
                const wttrLines = (wttrResult.value ?? '').split('\n');
                for (let wttrIndex = 0; wttrIndex < wttrLines.length; wttrIndex++) {
                    const fullLine = wttrLines[wttrIndex];

                    if (wttrIndex === 0) {
                        printer({
                            type: CommandEnum.SystemInfo,
                            tag: 'Weather report',
                            value: fullLine,
                        });
                        continue;
                    }

                    printer({
                        type: CommandEnum.MonoSpace,
                        value: fullLine.replaceAll(' ', ' '),
                    });
                }
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
