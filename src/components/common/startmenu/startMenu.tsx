import React, { useState } from 'react';
import { Image, Center } from '@chakra-ui/react';

import { BasicImage, BasicLazyImage } from '../../core/image';
import { site } from '../../../constants/site';
import { StartMenuApplications, StartMenuMostUsed } from '../../../constants/startMenuList';
import { KnownApplets } from '../../../constants/knownApplets';
import { StartMenuSize } from '../../../contracts/interface/IFile';

interface IProps { }

export const StartMenu: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="startmenu">
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
                        StartMenuMostUsed.map(sMenu => (
                            <li key={sMenu.id}>
                                <BasicImage imageUrl={sMenu.imgUrl} />
                                <span>{sMenu.name}</span>
                            </li>
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
                        <h3 className="mt1">Applications</h3>
                    </header>
                    <div className="tiles-wrapper">
                        {
                            StartMenuApplications.map(sMenu => (
                                <div key={sMenu.id} className={`tile tile-${StartMenuSize[sMenu.size]}`}>
                                    <BasicImage imageUrl={sMenu.imgUrl} />
                                    <p>{sMenu.name}</p>
                                </div>
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
    );
}

