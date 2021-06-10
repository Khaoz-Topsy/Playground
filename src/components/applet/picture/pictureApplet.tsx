import React, { useState } from 'react'
import { Center } from '@chakra-ui/react';

import { BasicImage } from '../../core/image';
import { Background } from '../../../constants/appImage'
import { defaultPictureViewerHeight, defaultPictureViewerWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { LightBox } from '../../../components/common/lightbox';

import { Applet } from '../../window/applet/applet';

interface IProps extends IApplet {
    meta?: any;
    isMaximised?: boolean;
}

export const PictureApplet: React.FC<IProps> = (props: IProps) => {
    const [isMaximised, setMaximised] = useState(props?.isMaximised ?? false);

    const images = props?.meta?.images ?? [Background.bg1, Background.bg2];

    if (isMaximised) {
        return (<LightBox images={images} onClose={props.onClose} />);
    }

    return (
        <Applet
            key="picViewer"
            {...props}
            defaultHeight={defaultPictureViewerHeight}
            defaultWidth={defaultPictureViewerWidth}
            classNames="img-viewer"
            isFullscreen={true}
            onMaximise={() => setMaximised(!isMaximised)}
        >
            <Center>
                <BasicImage
                    imageUrl={images[0]}
                    alt={images[0]}
                />
            </Center>
        </Applet>
    );
}
