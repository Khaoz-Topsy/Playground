import React, { useEffect, useState } from 'react';
import DragSelect from 'dragselect';

import { AppletType } from '../../../constants/enum/appletType';
import { DesktopIcons } from '../../../constants/desktopIconList';
import { LaunchedApp } from '../../../contracts/launchedApp';
import { anyObject } from '../../../helper/typescriptHacks';
import { WindowStore } from '../../../state/window';
import { DesktopIcon } from './desktopIcon';

export const Desktop: React.FC = () => {
    const [selectedIconIndexes, setSelectedIconIndexes] = useState<Array<number>>([]);
    const [dragSelect, setDragSelect] = useState<any>(null);

    // eslint-disable-next-line
    useEffect(() => {
        if (dragSelect != null) return;
        console.log('useEffect');

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
        console.log(name);
        const newArr = [
            ...selectedIconIndexes,
            ...getNewItemsFromDragSelect(data),
        ];
        setSelectedIconIndexes(newArr);
    }

    const getNewItemsFromDragSelect = (data: any) => (data?.items ?? [])
        .map((htmlElem: any) => +(htmlElem?.attributes?.['data-index']?.value ?? -1))
        .filter((i: number) => i >= 0)
        .map(((i: number) => {
            console.log(i);
            return i;
        }));

    const setIndex = (index: number) => (e: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        setSelectedIconIndexes([index]);
    }

    const openApp = (index: number) => (e: any) => {
        console.log('openApp', index);
        e?.preventDefault();
        e?.stopPropagation();
        const appType = DesktopIcons[index]?.appletType ?? AppletType.none;
        if (appType !== AppletType.none) {
            const newActiveApp: LaunchedApp = {
                appType,
                additionalProps: anyObject,
            };
            WindowStore.update(store => {
                store.currentFocused = appType;
                store.activeApps = (store.activeApps.findIndex(aa => aa.appType === appType) < 0)
                    ? [...store.activeApps, newActiveApp]
                    : [...store.activeApps]
            });
            setSelectedIconIndexes(selectedIconIndexes.filter(si => si === appType));
        }
    }

    return (
        <div className="layer">
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

