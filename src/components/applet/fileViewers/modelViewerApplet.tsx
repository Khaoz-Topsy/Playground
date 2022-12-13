import { Center } from '@chakra-ui/react';
import React from 'react';

import { DownloadFile } from '../../../constants/documentFile';
import { defaultPictureViewerHeight, defaultPictureViewerWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet';
import { Applet } from '../../window/applet/applet';

const STLViewer = require('stl-viewer');

interface IProps extends IApplet { }

export const ModelViewerApplet: React.FC<IProps> = (props: IProps) => {
    const model = props?.meta?.model ?? DownloadFile.khaozTopsyGithubContribution;

    return (
        <Applet
            key="modelViewerViewer"
            {...props}
            defaultWidth={defaultPictureViewerWidth}
            defaultHeight={defaultPictureViewerHeight}
            classNames="model-viewer"
            isFullscreen={true}
        >
            <Center>
                <STLViewer
                    model={model}
                    width={defaultPictureViewerWidth}
                    height={defaultPictureViewerHeight}
                    modelColor='#366c95'
                    backgroundColor='#494949'
                    rotate={true}
                    orbitControls={true}
                    cameraX={200}
                    cameraY={200}
                    cameraZ={200}
                />
            </Center>
        </Applet>
    );
}
