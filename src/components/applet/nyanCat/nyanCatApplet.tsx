import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const NyanCatApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { pointerEvents: 'none', zIndex: 2 },
                key: "nyancat-iframe",
                src: "https://cristurm.github.io/nyan-cat/"
            }}
        />
    );
}
