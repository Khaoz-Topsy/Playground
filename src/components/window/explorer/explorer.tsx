import React, { ReactNode } from 'react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';

import { Window } from '../window';
import { windowIcon } from '../windowIcon';
import { ExplorerHeader } from './explorerHeader';
import { ExplorerSidebar } from './explorerSidebar';

export const Explorer: React.FC<IWindowProps> = (props: IWindowProps) => {
    const headerFunc = (app: IApplet): ReactNode => (
        <ExplorerHeader
            {...app}
            windowIcon={windowIcon(app.appType)}
        />
    );
    return (
        <Window
            {...props}
            classNames="explorer"
            headerFunc={headerFunc}
            sidebar={<ExplorerSidebar />}
        >
            <div>content</div>
        </Window>
    );
}

