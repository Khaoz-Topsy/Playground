import React, { useState } from 'react';
import { Box, Center, Divider, Icon, SimpleGrid, VStack } from '@chakra-ui/react';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

import { IApplet } from '../../../contracts/interface/IApplet'
import { openExternalInNewTab } from '../../../helper/linkHelper';
import { translate } from '../../../integration/i18n';
import { Applet } from '../../window/applet/applet';

import { IYellowPagesGroup, YellowPagesList } from './yellowPages';

interface IProps extends IApplet { }


export const YellowPagesApplet: React.FC<IProps> = (props: IProps) => {
    const [selectedIcon, setSelectedIcon] = useState(0);

    const iconOptions = [
        {
            icon: Squares2X2Icon
        },
        {
            icon: ListBulletIcon
        }
    ];

    const displayUrl = (fullUrl: string) => {
        return fullUrl.replace('https://', '').trim();
    }

    const renderGridItems = (yellowPagesList: Array<IYellowPagesGroup>) => {
        if (selectedIcon === 0) {
            return (
                yellowPagesList.map(y => (
                    <Box key={y.name} className="group noselect">
                        <Box className="group-name">{translate(y.name)}</Box>
                        <Box className="pages">
                            {
                                y.pages.map(p => (
                                    <Box key={p.url} className="page" onClick={() => openExternalInNewTab(p.url)}>
                                        <Box className="name">{p.name}</Box>
                                        <Box className="url">{displayUrl(p.url)}</Box>
                                        <Box className="descrip">{p.description}</Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                ))
            );
        }

        return (
            yellowPagesList.map(y => y.pages.map(p => (
                <Box key={`${y.name}-${p.url}`} className="page" onClick={() => openExternalInNewTab(p.url)}>
                    <Box className="name"><i>{translate(y.name)}</i>&nbsp;-&nbsp;{p.name}</Box>
                    <Box className="url">{displayUrl(p.url)}</Box>
                    <Box className="descrip">{p.description}</Box>
                </Box>
            )))
        );
    }

    return (
        <Applet
            key="yellowPagesViewer"
            {...props}
            classNames="yellow-pages-viewer"
            isFullscreen={true}
        >
            <VStack w="100%" height="100%" spacing={0} align="stretch">
                <Box px={3} display="flex" flexDirection="row">
                    <Center mr={5}>Group by:</Center>
                    {
                        iconOptions.map((iconOpt, index: number) => (
                            <Box ml={3} className={classNames('icon-wrapper', { 'active': selectedIcon === index })} onClick={() => setSelectedIcon(index)}>
                                <Icon w={30} h={30} as={iconOpt.icon} />
                            </Box>
                        ))
                    }
                </Box>
                <Divider pt={2} />
                <Box flexGrow={1}>
                    <SimpleGrid mt={2} mb={4} mx={2} minChildWidth="250px" columnGap="5px" rowGap="5px">
                        {renderGridItems(YellowPagesList())}
                    </SimpleGrid>
                </Box>
            </VStack>
        </Applet>
    );
}
