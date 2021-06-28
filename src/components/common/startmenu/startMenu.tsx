import React from 'react';
import classNames from 'classnames';

import { BasicLazyImage } from '../../core/image';
import { site } from '../../../constants/site';
import { StartMenuApplications, StartMenuMostUsed } from '../../../constants/startMenuList';
import { IAppletFile, IFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { openAppletOrFile } from '../../../helper/appletHelper';

import { StartMenuMostUsedItem } from './startMenuMostUsedItem';
import { StartMenuTile } from './startMenuTile';
import { windowIconString } from '../../window/windowIcon';

interface IProps {
    isOpen: boolean;
    toggleStartMenu: (newValue?: boolean) => void;
}

export const StartMenu: React.FC<IProps> = (props: IProps) => {

    const openApp = (startMenuItem: IAppletFile | IFile) => (e: any) => {
        e?.preventDefault();
        e?.stopPropagation();
        props.toggleStartMenu(false);
        openAppletOrFile(startMenuItem);
    }

    return (
        <>
            {
                props.isOpen && <div className="startmenu-bg fullscreen" onClick={() => props.toggleStartMenu()}></div>
            }
            <div className={classNames('startmenu', 'noselect', { 'isOpen': props.isOpen })}>
                <section className="list">
                    <div className="profile">
                        <BasicLazyImage
                            classNames="profile-pic"
                            imageUrl={site.kurt.profilePic}
                            imageName={site.kurt.fullName}
                            alt={site.kurt.fullName}
                        />
                        <p>{site.kurt.fullName}</p>
                    </div>
                    <h3 className="mt1">{translate(LocaleKey.mostUsedItems)}</h3>
                    <ul className="most-used-list">
                        {
                            StartMenuMostUsed.map(sMenu => (
                                <StartMenuMostUsedItem
                                    key={sMenu.id} {...sMenu}
                                    onClick={openApp(sMenu)}
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
                    <div className="tiles-section-content">
                        <header>
                            <h3 className="mt1">{translate(LocaleKey.applications)}</h3>
                        </header>
                        <div className="tiles-wrapper">
                            {
                                StartMenuApplications.map(sMenu => (
                                    <StartMenuTile
                                        key={sMenu.id} {...sMenu}
                                        imgUrl={sMenu.imgUrl ?? windowIconString((sMenu as any)?.appletType)}
                                        onClick={openApp(sMenu)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="tiles-section-content">
                        <header>
                            <h3 className="mt1">Explore</h3>
                        </header>
                        <div className="tiles-wrapper">
                            <div className="tile tile-small"></div>
                            <div className="tile tile-large"></div>
                            <div className="tile x-large"></div>
                            <div className="tile"></div>
                            <div className="tile"></div>
                            <div className="tile"></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

