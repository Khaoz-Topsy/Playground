/// <reference path='../../../types.d.ts' />
import React from 'react';
import Terminal from 'react-terminal-app';
// import { Terminal } from './customTerminal';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { staticList } from './commands/static';
import { dynamicListFunc } from './commands/dynamic';
import { withServices } from '../../../integration/dependencyInjection';
import { ISettingStore, SettingStore } from '../../../state/setting/store';

import { IExpectedServices, dependencyInjectionToProps } from './terminalApplet.dependencyInjection';
import { SecretStore } from '../../../state/secrets/store';
import { useToast } from '@chakra-ui/react';
import { CommandEnum, IExecutedCommand } from './command';

interface IWithoutExpectedServices { }
interface IProps extends IApplet, IWithoutExpectedServices, IExpectedServices { }

export const TerminalAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    const enableClippy = (enabled: boolean) => {
        SettingStore.update((store: ISettingStore) => {
            store.enabledClippy = enabled;
        })
    }

    const dynListProps = {
        clippyIsEnabled: currentSettings.enabledClippy,
        virtualAssistantService: props.virtualAssistantService,
        secretStore: SecretStore,
        currentSecretsFound,
        toastFunc,
        enableClippy: enableClippy,
    }

    const cmd = {
        dynamicList: dynamicListFunc(dynListProps),
        staticList: staticList(),
    }

    const config = {
        prompt: '➜ ',
        version: props?.info?.version ?? '0.0.1',
        initialDirectory: 'workspace',
        bootCmd: 'intro',
        commands: {
            intro: {
                descrip: 'testDescrip' as any,
                run: async (print: (cmd: IExecutedCommand) => void) => {
                    print({
                        type: CommandEnum.SystemInfo,
                        tag: 'Loading',
                        value: `Welcome to Kurt's Terminal`,
                    });
                }
            },
            start: {
                descrip: 'testDescrip' as any,
                run: async () => {
                    alert('test');
                }
            }
        },
    }

    return (
        <Applet
            {...props}
            classNames="terminal"
            isFullscreen={true}
        >
            <Terminal cmd={cmd} config={config} />
            {/* <Terminal {...config} /> */}
        </Applet>
    );
}

export const TerminalApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    TerminalAppletUnconnected,
    dependencyInjectionToProps
);
