import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface IProps {
    classNames?: string;
    children: ReactNode;
}

export const WindowContent: React.FC<IProps> = (props: IProps) => {
    return (
        <div className={classNames('window-content', props.classNames)}>
            {props.children}
        </div>
    );
}

