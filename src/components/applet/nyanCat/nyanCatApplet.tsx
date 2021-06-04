import React from 'react';

import { AppletType } from '../../../constants/enum/appletType';
import { IApplet } from '../../../contracts/interface/IApplet';
import { Window } from '../../window/window';
import { windowIcon } from '../../window/windowIcon';

interface IProps extends IApplet { }

export const NyanCatApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <Window
            {...props}
            key="nyanWindow"
            title="Nyan Cat"
            defaultWidth={700}
            defaultHeight={500}
            windowIcon={windowIcon(AppletType.nyanCat)}
            classNames="full-content"
        >
            <iframe
                id="nyanIframe"
                key="nyanIframe"
                title="nyanIframe"
                style={{ pointerEvents: 'none' }}
                src="https://cristurm.github.io/nyan-cat/"
            />
        </Window>
    );
}
