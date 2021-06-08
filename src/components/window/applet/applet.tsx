import React, { ReactNode } from 'react'

import { IApplet } from '../../../contracts/interface/IApplet';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';

import { Window } from '../window'
import { WindowHeader } from '../windowHeader'
import { windowIcon } from '../windowIcon'

interface IProps extends IWindowProps {
    children: ReactNode;
}

export const Applet: React.FC<IProps> = (props: IProps) => {
    const headerFunc = (app: IApplet): ReactNode => (
        <WindowHeader
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
        />
    );
}

