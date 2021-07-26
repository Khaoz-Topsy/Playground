import React from 'react'

import { FileIcon } from '../../../constants/appImage';
import { site } from '../../../constants/site';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const SwaggerApplet: React.FC<IProps> = (props: IProps) => {
    const {
        key = 'unknown',
        src = site.assistantApps.api,
    } = props?.meta;

    return (
        <IFrameApplet
            {...props}
            key={key}
            meta={{
                style: { zIndex: 2 },
                key: 'swaggerDocs',
                src: src,
                icon: FileIcon.swagger,
            }}
        />
    );
}
