import React from 'react'

import { site } from '../../../constants/site';
import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet { }

export const IFrameApplet: React.FC<IProps> = (props: IProps) => {
    const {
        key = 'unknown',
        src = site.repo,
        style = undefined,
        refreshOnResize = false,
        defaultHeight = undefined,
        defaultWidth = undefined,
    } = props?.meta;

    const propsFromMeta = {
        refreshOnResize,
        defaultHeight,
        defaultWidth,
    };

    return (
        <Applet
            {...props}
            {...propsFromMeta}
            key={`${key}-window`}
            name={props.name}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id={key}
                key={`${key}-frame`}
                title={props.name.toString()}
                className="pos-abs-top-left"
                style={style}
                src={src}
                frameBorder="0"
            />
        </Applet>
    );
}
