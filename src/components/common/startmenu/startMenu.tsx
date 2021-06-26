import React from 'react';
import classNames from 'classnames';

import { BasicImage, BasicLazyImage } from '../../core/image';
import { site } from '../../../constants/site';
import { StartMenuApplications, StartMenuMostUsed } from '../../../constants/startMenuList';
import { isApplet, StartMenuSize } from '../../../contracts/interface/IFile';

import { StartMenuMostUsedItem } from './startMenuMostUsedItem';

interface IProps {
    isOpen: boolean;
    toggleStartMenu: () => void;
}

export const StartMenu: React.FC<IProps> = (props: IProps) => {
    return (
        <>
            {
                props.isOpen && <div className="startmenu-bg fullscreen" onClick={props.toggleStartMenu}></div>
            }
            <div className={classNames('startmenu', 'noselect', { 'isOpen': props.isOpen })}>
                <section className="list">
                    <div className="profile">
                        <BasicLazyImage
                            classNames="profile-pic"
                            imageUrl={site.kurt.profilePic}
                            imageName="Kurt Lourens"
                            alt="Kurt Lourens"
                        />
                        <p>{site.kurt.fullName}</p>
                    </div>
                    <h3 className="mt1">Most Used</h3>
                    <ul className="most-used-list">
                        {
                            StartMenuMostUsed.map(sMenu => (<StartMenuMostUsedItem key={sMenu.id} {...sMenu} />))
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
                            <h3 className="mt1">Applications</h3>
                        </header>
                        <div className="tiles-wrapper">
                            {
                                StartMenuApplications.map(sMenu => {
                                    const isApp = isApplet(sMenu)
                                    const baseCss = `tile tile-${StartMenuSize[sMenu.size]}`;
                                    return (
                                        <div key={sMenu.id}
                                            className={classNames(baseCss, { 'full': !isApp })}
                                            style={{ backgroundColor: sMenu.backgroundColour, backgroundImage: sMenu.backgroundImage }}
                                        >
                                            <BasicImage imageUrl={sMenu.imgUrl} />
                                            {isApp && <p>{sMenu.name}</p>}
                                        </div>
                                    );
                                })
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

