import React from 'react';
import { Timeline } from 'react-twitter-widgets';

import { site } from '../../../constants/site';
import { defaultTwitterHeight, defaultTwitterWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';

interface IProps extends IApplet { }

export const TweetListApplet: React.FC<IProps> = (props: IProps) => {
    const {
        key = 'unknown',
        src = site.kurt.twitter,
        defaultHeight = defaultTwitterHeight,
        defaultWidth = defaultTwitterWidth,
    } = props?.meta;

    const propsFromMeta = {
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
            <Timeline
                key={`${key}-twtitter-timeline`}
                dataSource={{ sourceType: 'url', url: src }}
                options={{
                    theme: "dark",
                    dnt: true,
                }}
            />
        </Applet>
    );
}
