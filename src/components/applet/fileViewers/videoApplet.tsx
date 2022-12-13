import { Center } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { defaultHeight, defaultWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';

interface IProps extends IApplet {
    loop?: boolean;
    controls?: boolean;
}

export const VideoApplet: React.FC<IProps> = (props: IProps) => {
    const videoUrl = props?.meta?.videoUrl;
    const localVideo = React.createRef<any>();

    useEffect(() => {
        const timeOut = setTimeout(() => localVideo.current.play(), 1000);

        return () => {
            clearTimeout(timeOut);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Applet
            key="vidViewer"
            {...props}
            defaultHeight={defaultHeight}
            defaultWidth={defaultWidth}
            classNames="vid-viewer"
            isFullscreen={true}
        >
            <Center>
                {
                    (videoUrl?.length > 5) &&
                    <video src={videoUrl} ref={localVideo} autoPlay={false} loop={props.loop ?? false} controls={props.controls ?? true} style={{ height: '100%' }}></video>
                }
            </Center>
        </Applet>
    );
}
