import React from 'react';
import { Terminal } from './terminalWindow';
import { useToast } from '@chakra-ui/react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { withServices } from '../../../integration/dependencyInjection';
import { ISettingStore, SettingStore } from '../../../state/setting/store';
import { SecretStore } from '../../../state/secrets/store';
import { closeApp } from '../../../state/window/reducer';
import { WindowStore } from '../../../state/window/store';

import { IExpectedServices, dependencyInjectionToProps } from './terminalApplet.dependencyInjection';
import { allKnownApps } from '../../../constants/knownApplets';
import { AppletType } from '../../../constants/enum/appletType';
import { CommandEnum } from './command';
import { staticList } from './commands/static';

interface IWithoutExpectedServices { }
interface IProps extends IApplet, IWithoutExpectedServices, IExpectedServices { }

export const TerminalAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSettings = SettingStore.useState(store => store);
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    let info: any = allKnownApps().find(app => app.appletType === AppletType.terminal)?.info;

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

    const config = {
        prompt: '➜ ',
        user: 'kurt.lourens',
        version: info?.version ?? '0.0.1',
        folderStructure: props.folderStructure,
        commands: {
            exit: {
                type: CommandEnum.System,
                descrip: 'Type "exit" to closse the terminal.',
                aliasList: ['kill', 'back'],
                run: async () => WindowStore.update(closeApp(props.guid)),
            },
            ...staticList
        },
    }

    return (
        <Applet
            {...props}
            classNames="terminal"
            isFullscreen={true}
        >
            <Terminal {...config} />
        </Applet>
    );
}

export const TerminalApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    TerminalAppletUnconnected,
    dependencyInjectionToProps
);
