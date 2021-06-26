import React from 'react'
import { AppletIcon } from '../../../constants/appImage';

import { site } from '../../../constants/site';
import { defaultMusicPlayerHeight, defaultMusicPlayerWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';

interface IProps extends IApplet { }

export const MusicPlayerApplet: React.FC<IProps> = (props: IProps) => {

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: 'spotify',
                src: site.kurt.spotifyPublicLikedSongs,
                icon: AppletIcon.nyanCat,
                defaultHeight: defaultMusicPlayerHeight,
                defaultWidth: defaultMusicPlayerWidth,
            }}
        />
    );
}
