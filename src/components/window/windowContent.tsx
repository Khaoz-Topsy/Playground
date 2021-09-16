import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface IProps {
    classNames?: string;
    children: ReactNode;
}

export const WindowContent: React.FC<IProps> = (props: IProps) => {
    return (
        <div className={classNames('window-content', props.classNames)} draggable="false">
            {props.children}
        </div>
    );
}

