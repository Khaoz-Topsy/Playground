/// <reference path='../../../types.d.ts' />
import React from 'react';
import Terminal from 'react-terminal-app';

import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';
import { staticList } from './commands/static';
import { dynamicList } from './commands/dynamic';

interface IProps extends IApplet { }

export const TerminalApplet: React.FC<IProps> = (props: IProps) => {
    const cmd = {
        dynamicList,
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
