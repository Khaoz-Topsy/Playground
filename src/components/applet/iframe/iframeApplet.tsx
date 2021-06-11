import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet { }

export const IFrameApplet: React.FC<IProps> = (props: IProps) => {
    const {
        key = 'unknown',
        src = 'https://khaoznet.xyz',
        style = undefined
    } = props?.meta;

    return (
        <Applet
            {...props}
            key={`${key}-window`}
            name={props.name}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id={key}
                key={key}
                title={key}
                className="pos-abs-top-left"
                style={style}
                src={src}
                frameBorder="0"
            />
        </Applet>
    );
}
