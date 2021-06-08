import React, { ReactNode } from 'react'

import { IApplet } from '../../../contracts/interface/IApplet';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';

import { Window } from '../window'
import { windowIcon } from '../windowIcon'
import { ExplorerHeader } from './explorerHeader'

export const Explorer: React.FC<IWindowProps> = (props: IWindowProps) => {
    const headerFunc = (app: IApplet): ReactNode => (
        <ExplorerHeader
            title={app.title}
            windowIcon={windowIcon(app.appType)}
            onMinimise={app.onMinimise}
            onClose={app.onClose}
        />
    );
    return (
        <Window
            {...props}
            headerFunc={headerFunc}
            sidebar={<div style={{ background: 'red' }}>Hi</div>}
        >
            <div>content</div>
        </Window>
    );
}

