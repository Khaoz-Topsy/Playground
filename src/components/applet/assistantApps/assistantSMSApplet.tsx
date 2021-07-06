import React from 'react'
import { AppletIcon } from '../../../constants/appImage';

import { defaultScrapMechanicHeight, defaultScrapMechanicWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const AssistantSMSApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'assistantSMS',
                src: getIframeUrl(props),
                icon: AppletIcon.assistantSMS,
                defaultHeight: defaultScrapMechanicHeight,
                defaultWidth: defaultScrapMechanicWidth,
            }}
        />
    );
}
