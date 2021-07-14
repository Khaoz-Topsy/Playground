import React from "react";
import { BasicImage } from "../core/image";

interface IVirusScanProps {
    imgUrl?: string;
}

export const VirusScan: React.FC<IVirusScanProps> = (props: IVirusScanProps) => {
    return (
        <div className="virus-scan">
            <em></em>
            <div>
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                <i></i><i></i><i></i>
            </div>
            {
                props.imgUrl != null && <BasicImage imageUrl={props.imgUrl} alt="virus scan" />
            }
            <span></span>
        </div>
    );
}