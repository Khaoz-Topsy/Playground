import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export const WindowContent: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="window-content">
            {props.children}
        </div>
    );
}

