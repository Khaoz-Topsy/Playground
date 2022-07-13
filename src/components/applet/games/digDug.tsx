import React from 'react';
import { AppletIcon } from '../../../constants/appImage';
import { defaultDigDugHeight, defaultDigDugWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet';
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const DigDugApplet: React.FC<IProps> = (props: IProps) => {

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'digdug-classic',
                src: getIframeUrl(props),
                icon: AppletIcon.digdug,
                defaultHeight: defaultDigDugHeight,
                defaultWidth: defaultDigDugWidth,
            }}
        />
    );
}
