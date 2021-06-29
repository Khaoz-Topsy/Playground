import React from 'react';
import classNames from 'classnames';

interface IProps {
    imageUrl: string;
    className?: string;
}

export const StartMenuSlidingTileImage = (props: IProps) => {
    return (
        <img
            src={props.imageUrl}
            className={classNames('frame', props.className || '')}
            alt={props.imageUrl}
        />
    );
};