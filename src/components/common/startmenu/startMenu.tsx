import React from 'react';
import classNames from 'classnames';

import { KnownApplets } from '../../../constants/knownApplets';
import { StartMenuApplications, StartMenuExplore, StartMenuMostUsed } from '../../../constants/startMenuList';
import { IAppletFile, IFile, IStartMenuAppletFile, IStartMenuFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { openAppletOrFile } from '../../../helper/appletHelper';
import { disabledContext } from '../../../helper/clickHelper';
import { windowIconString } from '../../window/windowIcon';
import { WindowStore } from '../../../state/window/store';

import { StartMenuMostUsedItem } from './startMenuMostUsedItem';
import { StartMenuSlidingTile } from './startMenuSlidingTile';
import { StartMenuProfile } from './startMenuProfile';
import { StartMenuTile } from './startMenuTile';
import { MiscStore } from '../../../state/misc/store';

interface IProps {
    isOpen: boolean;
    toggleStartMenu: (newValue?: boolean) => void;
}

export const StartMenu: React.FC<IProps> = (props: IProps) => {
    const openApp = (startMenuItem: IAppletFile | IFile) => (e: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        props.toggleStartMenu(false);
        openAppletOrFile(WindowStore, startMenuItem);
    }

    const renderTile = (sMenu: IStartMenuAppletFile | IStartMenuFile) => {
        const onClick = openApp(sMenu);
        if (sMenu.images != null && sMenu.images.length > 0) {
            return (
                <StartMenuSlidingTile
                    // key={sMenu.id}
                    key={`${sMenu.id}-isOpen:${props.isOpen.toString()}`}
                    {...sMenu}
                    onClick={onClick}
                    openAppProperties={() => MiscStore.update(() => ({ appletViewProperties: sMenu }))}
                />
            );
        }

        return (
            <StartMenuTile
                key={sMenu.id} {...sMenu}
                imgUrl={sMenu.imgUrl ?? windowIconString((sMenu as any)?.appletType)}
                onClick={onClick}
                openAppProperties={() => MiscStore.update(() => ({ appletViewProperties: sMenu }))}
            />
        );
    }

    const closeStartMenuClick = (e: any) => {
        e?.preventDefault?.();
        props.toggleStartMenu(false);
    }

    return (
        <>
            {
                props.isOpen && <div className="startmenu-bg fullscreen" onClick={closeStartMenuClick} onContextMenu={closeStartMenuClick}></div>
            }
            <div className={classNames('startmenu', 'noselect', { 'isOpen': props.isOpen })} onContextMenu={disabledContext}>
                <section className="list">
                    <StartMenuProfile onClick={openApp(KnownApplets.kurtLourens)} />
                    <h3 className="mt1">{translate(LocaleKey.mostUsedItems)}</h3>
                    <ul className="most-used-list">
                        {
                            StartMenuMostUsed.map(sMenu => (
                                <StartMenuMostUsedItem
                                    key={sMenu.id} {...sMenu}
                                    onClick={openApp(sMenu)}
                                    openAppProperties={() => MiscStore.update(() => ({ appletViewProperties: sMenu }))}
                                />
                            ))
                        }
                    </ul>
                    {/* <ul className="bottom-bar">
                    <li>
                        <BasicImage imageUrl={KnownApplets.settings.imgUrl} />
                    </li>
                    <li>
                        <BasicImage imageUrl={KnownApplets.settings.imgUrl} />
                    </li>
                    <li>
                        <BasicImage imageUrl={KnownApplets.settings.imgUrl} />
                    </li>
                </ul> */}
                </section>
                <section className="tiles-section">
                    <div className="tiles-section-content scroll-without-scrollbar">
                        <header>
                            <h3 className="mt1">{translate(LocaleKey.applications)}</h3>
                        </header>
                        <div className="tiles-wrapper">
                            {StartMenuApplications.map(renderTile)}
                        </div>
                    </div>
                    <div className="tiles-section-content">
                        <header>
                            <h3 className="mt1">Explore</h3>
                        </header>
                        <div className="tiles-wrapper">
                            {StartMenuExplore.map(renderTile)}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

