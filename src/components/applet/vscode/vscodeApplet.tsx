import React from 'react'
import { site } from '../../../constants/site';

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet {
    meta?: any;
}

export const VsCodeApplet: React.FC<IProps> = (props: IProps) => {
    const githubUrl = props?.meta?.url ?? site.repo;
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
