import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet'

interface IProps extends IApplet { }

export const KurtApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: "kurt-iframe",
                name: "Kurt Lourens CV",
                src: "https://kurtlourens.com",
            }}
        />
    );
}
