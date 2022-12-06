import React, { useState } from 'react';
import { ArrowBackIcon, ArrowForwardIcon, HamburgerIcon, StarIcon, CloseIcon, QuestionIcon } from '@chakra-ui/icons';
import { Box, Divider, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react';

import { AnimatedIconButton } from '../../common/button';
import { IApplet } from '../../../contracts/interface/IApplet'
import { Applet } from '../../window/applet/applet';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { WindowStore } from '../../../state/window/store';
import { closeApp } from '../../../state/window/reducer';
import { MiscStore } from '../../../state/misc/store';
import { allKnownApps } from '../../../constants/knownApplets';
import { AppletType } from '../../../constants/enum/appletType';
import { site } from '../../../constants/site';
import { HomeIcon } from '@heroicons/react/24/solid';

declare global {
    interface browserFrame { contentWindow: any; }
}

interface IProps extends IApplet { }


export const BrowserApplet: React.FC<IProps> = (props: IProps) => {
    const homeUrl = 'https://www.google.com/webhp?igu=1&gws_rd=ssl';
    const [url, setUrl] = useState(homeUrl);

    let info: any = allKnownApps().find(app => app.appletType === AppletType.browser)?.info;

    return (
        <Applet
            key="browserApp"
            {...props}
            classNames="browser"
            isFullscreen={true}
        >
            <VStack w="100%" height="100%" spacing={0} align="stretch">
                <Box px={2} display="flex" flexDirection="row" className="actions">
                    <AnimatedIconButton
                        icon={<ArrowBackIcon />}
                        disabled={true}
                        onClick={() => { }}
                    />
                    <AnimatedIconButton
                        icon={<ArrowForwardIcon />}
                        disabled={true}
                        onClick={() => { }}
                    />
                    <AnimatedIconButton
                        icon={<HomeIcon />}
                        onClick={() => setUrl(homeUrl)}
                    />
                    <Input mr={3} value={url} disabled className="url" />
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            className="menu"
                            aria-label="Menu"
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            <MenuItem icon={<StarIcon />} onClick={() => setUrl(site.kurt.website)}>
                                {translate(LocaleKey.kurtLourensCV)}
                            </MenuItem>
                            <MenuItem icon={<StarIcon />} disabled={true} className="disabled">
                                New Window
                            </MenuItem>
                            <Divider my={1} />
                            <MenuItem icon={<QuestionIcon />} onClick={() => MiscStore.update(() => ({ appletViewProperties: { ...props, info } }))}>
                                {translate(LocaleKey.properties)}
                            </MenuItem>
                            <MenuItem icon={<CloseIcon />} onClick={() => WindowStore.update(closeApp(props.guid))}>
                                {translate(LocaleKey.exit)}
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box flexGrow={1} position="relative">
                    <iframe
                        id="browser-iframe"
                        key={`${url}-frame`}
                        title={props.name.toString()}
                        className="pos-abs-top-left"
                        style={{ width: '100%', height: '100%' }}
                        src={url}
                        frameBorder="0"
                    />
                </Box>
            </VStack>
        </Applet>
    );
}
