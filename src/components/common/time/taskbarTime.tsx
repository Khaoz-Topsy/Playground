import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Calendar from 'react-calendar';
import { Center } from '@chakra-ui/react';

import { currentShortTime, currentShortDate, currentMediumTime, currentMediumDate } from '../../../helper/dateHelper';

interface IProps {
    toggleStartMenu: (newValue?: boolean) => void;
}

export const TaskbarTime: React.FC<IProps> = (props: IProps) => {
    const [isTimeOpen, setTimeOpen] = useState(false);
    const [clockValue, setClockValue] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => setClockValue(new Date()),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    const closeTaskbarTime = () => {
        setTimeOpen(false);
        props.toggleStartMenu(false);
    }

    return (
        <>
            {
                isTimeOpen && <div className="taskbar-time-bg fullscreen" onClick={closeTaskbarTime}></div>
            }
            <div className={classNames('taskbar-time', { 'isOpen': isTimeOpen })}>
                <div className="taskbar-time-current noselect">
                    <p className="time">{currentMediumTime(clockValue)}</p>
                    <p className="date">{currentMediumDate(clockValue)}</p>
                </div>
                <hr />
                <Calendar value={new Date()} />
                <hr />
            </div>
            <div className="taskbar-tray taskbar-highlight-on-hover noselect" onClick={() => setTimeOpen(!isTimeOpen)}>
                <Center>
                    <p>{currentShortTime(clockValue)}<br />{currentShortDate(clockValue)}</p>
                </Center>
            </div>
        </>
    );
}

