import React from 'react'
import { AppletIcon } from '../../../constants/appImage';

import { site } from '../../../constants/site';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const AssistantSMSApplet: React.FC<IProps> = (props: IProps) => {
    const defaultWidth = 400;
    const defaultHeight = 600;

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'assistantSMS',
                src: site.assistantApps.sms.webapp,
                icon: AppletIcon.assistantSMS,
                refreshOnResize: true,
                defaultHeight,
                defaultWidth,
            }}
        />
    );
}
