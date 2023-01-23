import { Box, Flex, StackDivider, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FileIcon } from '../../../constants/appImage';
import { AppletType } from '../../../constants/enum/appletType';
import { ISlide, knownSlides } from '../../../constants/slides';

import { IApplet } from '../../../contracts/interface/IApplet'
import { currentMediumDate } from '../../../helper/dateHelper';
import { LocaleKey } from '../../../localization/LocaleKey';
import { openApp } from '../../../state/window/reducer';
import { WindowStore } from '../../../state/window/store';
import { Applet } from '../../window/applet/applet'

interface IProps extends IApplet { }

export const PowerPrezzApplet: React.FC<IProps> = (props: IProps) => {
    const [slideToLoad] = useState<string>(props?.meta?.slides);

    const openPresentation = (prezId: string) => () => {
        WindowStore.update(openApp(AppletType.powerPrezz, LocaleKey.powerPrezz, { slides: prezId }));
    }

    const renderSlides = (slideName: string) => {
        const items: Array<ISlide> = [];
        for (const slideDeckProp in knownSlides) {
            const slideDeck = knownSlides[slideDeckProp];
            if (slideDeck == null) continue;

            for (const slideProp in slideDeck) {
                const slideObj: ISlide = slideDeck[slideProp];
                if (slideObj == null) continue;

                if (slideObj.id === slideName) {
                    const LocalComp = slideObj.component;
                    return (
                        <LocalComp isFocused={props.isFocused} />
                    );
                };
                items.push(slideObj);
            }
        }

        return (
            <VStack
                divider={<StackDivider borderColor='gray.500' />}
                spacing={4}
                align='stretch'
                mt={4}
                mx={4}
            >
                <Text fontSize="xl">Recently opened</Text>
                {
                    items.slice(0, 5).map(item => {
                        return (
                            <Flex key={item.id} cursor="pointer" onClick={openPresentation(item.id)}>
                                <Box flex={1}>
                                    <img src={FileIcon.powerPrezz} alt="presentation file icon" />
                                </Box>
                                <Box mr={2}></Box>
                                <Box flexGrow={5}>
                                    <h3>{item.name}</h3>
                                    <p>{currentMediumDate(item.createdDate)}</p>
                                </Box>
                            </Flex>
                        );
                    })
                }
                <br />
            </VStack>
        );
    }

    const renderSidebarTile = (
        name: string,
        isFirst: boolean,
        isLast: boolean,
    ) => (
        <Box
            // onClick={() => onClick?.()}
            key={name}
            display={'flex'}
            className="noselect"
            justifyContent={'space-between'}
            alignItems={'center'}
            px={'16px'}
            py={2}

            borderTopRadius={isFirst ? 'md' : ''}

            borderBottomColor={isLast ? '' : 'whiteAlpha.400'}
            borderBottomWidth={isLast ? '' : '1px'}
            borderBottomRadius={isLast ? 'md' : ''}

            cursor="not-allowed"
            _hover={{ background: 'gray.700' }}
        >
            <Box color="white">
                {name}
            </Box>
        </Box>
    )

    return (
        <Applet
            key="prezzWindow"
            {...props}
            isFullscreen={true}
            classNames="prezz"
            customName={slideToLoad}
            sidebar={
                (slideToLoad != null)
                    ? null
                    : (
                        <Box borderColor={'whiteAlpha.400'} borderRadius={'md'} borderWidth={'1px'} >
                            {renderSidebarTile('Home', true, false)}
                            {renderSidebarTile('New', false, false)}
                            {renderSidebarTile('Open', false, true)}
                        </Box>
                    )
            }
        >
            {renderSlides(slideToLoad)}
        </Applet>
    );
}
