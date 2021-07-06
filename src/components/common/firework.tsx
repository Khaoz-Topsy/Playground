import React, { ReactNode } from "react";

interface IFireworksProps {
    hidden?: boolean;
    children: ReactNode;
}
export const Fireworks: React.FC<IFireworksProps> = (props: IFireworksProps) => {
    if (props.hidden) return (
        <>
            {props.children}
        </>
    );

    return (
        <div className="firework-wrapper">
            <div className="before"></div>
            <div className="after"></div>
            {props.children}
        </div>
    );
}