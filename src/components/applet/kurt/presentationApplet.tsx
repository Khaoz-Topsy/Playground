import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IFrameApplet } from '../iframe/iframeApplet'

interface IProps extends IApplet { }

export const PresentationApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: "kurt-presentation-iframe",
                src: getIframeUrl(props),
            }}
        />
    );
}
