import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet { }

export const KurtApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <Applet
            key="kurtWindow"
            {...props}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id="kurtIframe"
                key="kurtIframe"
                title="kurtIframe"
                className="pos-abs-top-left"
                style={{ zIndex: 2 }}
                src="https://kurtlourens.com"
                frameBorder="0"
            />
        </Applet>
    );
}
