import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
import classNames from 'classnames';

export const Desktop: React.FC = () => {
    const [selectedIconIndex, setSelectedIconIndex] = useState(-1);

    const icons = [
        {
            imgUrl: '/assets/img/appIcons/kurt.png',
            title: 'Kurt Lourens',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantNMS.png',
            title: 'Assistant for No Man\'s Sky',
        },
        {
            imgUrl: '/assets/img/appIcons/assistantSMS.png',
            title: 'Assistant for Scrap Mechanic',
        },
    ];

    const setIndex = (index: number) => (e: any) => {
        console.log(index);
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedIconIndex(index);
    }

    return (
        <div className="layer" onClick={setIndex(-1)}>
            <div className="fullscreen desktop-grid p1">
                {
                    icons.map((icon, index: number) => {
                        const classes = classNames('desktop-icon-slot noselect', { 'selected': index === selectedIconIndex });
                        return (
                            <div
                                key={icon.imgUrl}
                                // colSpan={1}
                                // rowSpan={1}
                                className={classes}
                                onClick={setIndex(index)}>
                                <Image src={icon.imgUrl} alt={icon.title} />
                                <p>{icon.title}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

