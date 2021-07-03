/// <reference path='../../../types.d.ts' />
import React from 'react';
import Terminal from 'react-terminal-app';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { staticList } from './commands/static';
import { dynamicListFunc } from './commands/dynamic';
import { withServices } from '../../../integration/dependencyInjection';

import { IExpectedServices, dependencyInjectionToProps } from './terminalApplet.dependencyInjection';
import { PullstateCore } from '../../../state/stateCore';
import { ISettingStore } from '../../../state/setting/store';

interface IWithoutExpectedServices { }
interface IProps extends IApplet, IWithoutExpectedServices, IExpectedServices { }

export const TerminalAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const { SettingStore } = PullstateCore.useStores();
    const currentSettings = SettingStore.useState(store => store);

    const enableClippy = (enabled: boolean) => {
        SettingStore.update((store: ISettingStore) => {
            store.enabledClippy = enabled;
        })
    }

    const dynListProps = {
        enableClippy: enableClippy,
        clippyIsEnabled: currentSettings.enabledClippy,
        virtualAssistantService: props.virtualAssistantService,
    }

    const cmd = {
        dynamicList: dynamicListFunc(dynListProps),
        staticList,
    }

    const config = {
        prompt: '➜ ',
        version: '0.0.1',
        initialDirectory: 'workspace',
        bootCmd: 'intro'
    }

    return (
        <Applet
            {...props}
            classNames="terminal"
            isFullscreen={true}
        >
            <Terminal cmd={cmd} config={config} />
        </Applet>
    );
}

export const TerminalApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    TerminalAppletUnconnected,
    dependencyInjectionToProps
);
