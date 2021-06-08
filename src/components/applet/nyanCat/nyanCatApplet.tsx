import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet { }

export const NyanCatApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <Applet
            key="nyanWindow"
            {...props}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id="nyanIframe"
                key="nyanIframe"
                title="nyanIframe"
                className="pos-abs-top-left"
                style={{ pointerEvents: 'none', zIndex: 2 }}
                src="https://cristurm.github.io/nyan-cat/"
            />
        </Applet>
    );
}
