import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet {
    meta?: any;
}

export const VsCodeApplet: React.FC<IProps> = (props: IProps) => {
    const githubUrl = props?.meta?.url ?? 'https://github1s.com/Khaoz-Topsy/KurtLourens-CV/blob/master/README.md';
    return (
        <Applet
            key="nyanWindow"
            {...props}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id="vsCodeIframe"
                key="vsCodeIframe"
                title="vsCodeIframe"
                className="pos-abs-top-left"
                style={{ zIndex: 2 }}
                src={githubUrl}
                frameBorder="0"
            />
        </Applet>
    );
}
