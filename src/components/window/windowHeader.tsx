import React, { ReactNode } from 'react';

import { WindowActions } from './windowActions';

interface IProps {
    title: string;
    windowIcon?: ReactNode;
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export const WindowHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="window-header">
            {
                props.windowIcon != null &&
                <div className="window-icon">
                    {props.windowIcon}
                </div>
            }
            <div className="content noselect">
                {props.title}
            </div>
            <WindowActions {...props} />
        </div>
    );
}

