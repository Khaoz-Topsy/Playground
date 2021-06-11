import React, { useState } from 'react'
import { Center } from '@chakra-ui/react';

import { BasicImage } from '../../core/image';
import { Backgrounds } from '../../../constants/appImage'
import { defaultPictureViewerHeight, defaultPictureViewerWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { LightBox } from '../../../components/common/lightbox';

import { Applet } from '../../window/applet/applet';

interface IProps extends IApplet { }

export const PictureApplet: React.FC<IProps> = (props: IProps) => {
    const [isMaximised, setMaximised] = useState(props?.isMaximised ?? false);

    const images = props?.meta?.images ?? Backgrounds.map(b => b.url);

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
