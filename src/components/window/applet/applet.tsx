import React, { ReactNode } from 'react'
import { AppletType } from '../../../constants/enum/appletType';

import { IApplet } from '../../../contracts/interface/IApplet';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';

import { Window } from '../window'
import { WindowHeader } from '../windowHeader'
import { windowIcon, iframeIcon } from '../windowIcon'

interface IProps extends IWindowProps {
    children: ReactNode;
}

export const Applet: React.FC<IProps> = (props: IProps) => {
    const headerFunc = (app: IApplet): ReactNode => (
        <WindowHeader
            {...app}
            name={app.name}
            windowIcon={app.appletType !== AppletType.iframe
                ? windowIcon(app.appletType)
                : iframeIcon(app?.meta?.icon)}
        />
    );
    return (
        <Window
            {...props}
            headerFunc={headerFunc}
        />
    );
}

