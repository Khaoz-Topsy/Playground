import React from 'react';

import { AppletIcon } from '../../../constants/appImage';
import { IApplet } from '../../../contracts/interface/IApplet';
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const RadioPlayerApplet: React.FC<IProps> = (props: IProps) => {

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'radio',
                src: getIframeUrl(props),
                icon: AppletIcon.radio,
            }}
        />
    );
}
