import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Calendar from 'react-calendar';
import { Box, Center, SimpleGrid } from '@chakra-ui/react';

import { ArrowExpand } from '../../core/icon';
import { currentShortTime, currentShortDate, currentMediumTime, currentMediumDate } from '../../../helper/dateHelper';
import { enterFullScreen, exitFullScreen, isFullscreen } from '../../../helper/documentHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { SettingStore } from '../../../state/setting/store';

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

    const toggleFullscreen = () => {
        if (isFullscreen()) {
            exitFullScreen();
        } else {
            enterFullScreen();
        }
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
                <SimpleGrid mt={2} mb={4} mx={2} minChildWidth="200px" columnGap="10px" rowGap="10px" className="options">
                    <Box mt={1} ml={1} p={2} className="option" onClick={toggleFullscreen}>
                        <Center className="icon"><ArrowExpand /></Center>
                        <Center key={clockValue?.toISOString?.()}>
                            <p>{translate(isFullscreen() ? LocaleKey.exitFullscreen : LocaleKey.enterFullscreen)}</p>
                        </Center>
                    </Box>
                </SimpleGrid>
            </div>
            <div className="taskbar-tray taskbar-highlight-on-hover noselect" onClick={() => setTimeOpen(!isTimeOpen)}>
                <Center>
                    <p>{currentShortTime(clockValue)}<br />{currentShortDate(clockValue)}</p>
                </Center>
            </div>
        </>
    );
}

