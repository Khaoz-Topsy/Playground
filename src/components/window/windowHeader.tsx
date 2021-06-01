import React from 'react';
import { WindowActions } from './windowActions';

interface IProps {
    title: string;
}

export const WindowHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="window-header">
            <div className="content noselect">
                {props.title}
            </div>
            <WindowActions />
        </div>
    );
}

