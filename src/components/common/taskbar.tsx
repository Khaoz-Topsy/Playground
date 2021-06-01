import React from 'react';
import { Image, Center } from '@chakra-ui/react';
import classNames from 'classnames';

import { currentShortTime, currentShortDate } from '../../helper/dateHelper';

export const Taskbar: React.FC = () => {

    const shortcuts = [
        {
            imgUrl: '/assets/img/appIcons/windows.svg',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantNMS.png',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantSMS.png',
        },
    ];

    return (
        <div className="taskbar">
            {
                shortcuts.map((shortcut, index: number) => {
                    const classes = classNames('applet-shortcut noselect');
                    return (
                        <div
                            key={shortcut.imgUrl}
                            // colSpan={1}
                            // rowSpan={1}
                            className={classes}>
                            <Image src={shortcut.imgUrl} alt={shortcut.imgUrl} />
                        </div>
                    );
                })
            }
            <div className="taskbar-tray noselect">
                <Center>
                    <p>{currentShortTime()}<br />{currentShortDate()}</p>
                </Center>
            </div>
        </div>
    );
}

