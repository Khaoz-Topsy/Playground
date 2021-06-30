import React from 'react'
import { AppletIcon } from '../../../constants/appImage';

import { site } from '../../../constants/site';
import { defaultScrapMechanicHeight, defaultScrapMechanicWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const AssistantSMSApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'assistantSMS',
                src: site.assistantApps.sms.webapp,
                icon: AppletIcon.assistantSMS,
                defaultHeight: defaultScrapMechanicHeight,
                defaultWidth: defaultScrapMechanicWidth,
            }}
        />
    );
}
