import DragSelect from 'dragselect'
import React, { useEffect, useState } from 'react'

import { AppletType } from '../../../constants/enum/appletType'
import { DesktopIcons } from '../../../constants/desktopIconList'
import { WindowStore } from '../../../state/window/store'
import { DesktopIcon } from './desktopIcon'
import { openAppFromDesktop } from '../../../state/window/reducer'
import classNames from 'classnames'
import { SettingStore } from '../../../state/setting/store'

export const Desktop: React.FC = () => {
    const [selectedIconIndexes, setSelectedIconIndexes] = useState<Array<number>>([]);
    const [dragSelect, setDragSelect] = useState<any>(null);
    const background = SettingStore.useState(store => store.background);

    useEffect(() => {
        if (dragSelect != null) return;

        const ds = new DragSelect({
            area: document.getElementById('desktop-grid') as any,
            selectables: document.getElementsByClassName('desktop-icon-slot') as any,
        });
        const dsNoType = ds as any;
        dsNoType.subscribe('elementselect', handleDragSelect('elementselect'));
        dsNoType.subscribe('elementunselect', handleDragSelect('elementunselect'));
        // dsNoType.subscribe('dragmove', handleDragSelect('dragmove'));
        // dsNoType.subscribe('callback', handleDragSelect);
        setDragSelect(ds);

        return () => {
            if (dragSelect == null) return;
            dragSelect?.stop?.();
        }
        // eslint-disable-next-line
    }, [0]);

    const handleDragSelect = (name: string) => (data: any) => {
        const newArr = [
            ...selectedIconIndexes,
            ...getNewItemsFromDragSelect(data),
        ];
        setSelectedIconIndexes(newArr);
    }

    const getNewItemsFromDragSelect = (data: any) => (data?.items ?? [])
        .map((htmlElem: any) => +(htmlElem?.attributes?.['data-index']?.value ?? -1))
        .filter((i: number) => i >= 0)
        // .map(((i: number) => {
        //     console.log(i);
        //     return i;
        // }))
        ;

    const setIndex = (index: number) => (e: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedIconIndexes([index]);
    }

    const openApp = (index: number) => (e: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        const icon = DesktopIcons[index];
        if (icon.appletType !== AppletType.none) {
            WindowStore.update(openAppFromDesktop(icon.appletType, icon.name, icon.meta));
            setSelectedIconIndexes([]);

            const dsNoType = dragSelect as any;
            dsNoType.clearSelection();
        }
    }

    return (
        <div className={classNames('fullscreen layer', 'bg', background)}>
            <div id="desktop-grid" className="fullscreen p1">
                {
                    DesktopIcons.map((desktopIcon, index: number) => {
                        return (
                            <DesktopIcon
                                key={desktopIcon.imgUrl}
                                index={index}
                                iconData={desktopIcon}
                                selectedIconIndexes={selectedIconIndexes}
                                setSelected={setIndex}
                                openApp={openApp}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

