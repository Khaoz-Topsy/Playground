import React, { useState } from 'react'

import { Background } from '../../../constants/appImage'
import { IApplet } from '../../../contracts/interface/IApplet'
import { LightBox } from '../../../components/common/lightbox';
import { Applet } from '../../window/applet/applet';
import { BasicImage } from '../../core/image';
import { Center } from '@chakra-ui/react';

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
