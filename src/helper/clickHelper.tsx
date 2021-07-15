import React, { ReactNode, useState } from "react";

export interface ITriggerAfterXClicksProps {
    classNames: string;
    numberOfRequiredClicks?: number;
    withinNumMilli?: number;
    children: ReactNode;
    onClick: () => void;
    trigger: () => void;
}
export const TriggerAfterXClicks: React.FC<ITriggerAfterXClicksProps> = (props: ITriggerAfterXClicksProps) => {
    const [clickDates, setClickDates] = useState<Array<Date>>([]);

    const numberOfRequiredClicks = props.numberOfRequiredClicks ?? 5;
    const withinNumMilli = props.withinNumMilli ?? (numberOfRequiredClicks * 1000);

    const incCount = () => {
        props.onClick?.();
        const currentDate = new Date();
        const validClickDates = clickDates.filter(dat => (dat.getTime() + withinNumMilli) > currentDate.getTime());
        if (validClickDates.length < numberOfRequiredClicks) {
            setClickDates([...validClickDates, new Date()]);
            return;
        }

        props.trigger?.();
        setClickDates([]);
    }

    return (
        <div className={props.classNames} onClick={incCount}>
            {props.children}
        </div>
    );
}

export const disabledContext = (e: any) => {
    e?.preventDefault?.();
}