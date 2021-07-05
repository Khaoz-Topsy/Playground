import classNames from 'classnames';
import React from 'react';

import { Loader } from '../core/loader';

interface IProps {
    shouldFade: boolean;
}

export const InitialisationScreen: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="fullscreen layer">
            <div className={classNames('fullscreen layer initial center-loader', { 'fade': props.shouldFade })}>
                <Loader text="Loading..." />
            </div>
        </div>
    );
}

