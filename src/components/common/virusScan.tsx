import React from "react";

interface IVirusScanProps { }

export const VirusScan: React.FC<IVirusScanProps> = (props: IVirusScanProps) => {
    return (
        <div className="virus-scan">
            <em></em>
            <div>
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i>
            </div>
            <span></span>
        </div>
    );
}