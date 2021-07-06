import React from 'react'
import { AppletIcon } from '../../../constants/appImage';

import { defaultMusicPlayerHeight, defaultMusicPlayerWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const MusicPlayerApplet: React.FC<IProps> = (props: IProps) => {

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'spotify',
                src: getIframeUrl(props),
                icon: AppletIcon.music,
                defaultHeight: defaultMusicPlayerHeight,
                defaultWidth: defaultMusicPlayerWidth,
            }}
        />
    );
}
