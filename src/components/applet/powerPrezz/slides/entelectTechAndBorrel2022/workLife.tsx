import { Box, Center, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { AppletIcon, Presentation } from '../../../../../constants/appImage';
import { AppletType } from '../../../../../constants/enum/appletType';
import { iframesInSlides, ISlideProps } from '../../../../../constants/slides';
import { LocaleKey } from '../../../../../localization/LocaleKey';
import { openApp } from '../../../../../state/window/reducer';
import { WindowStore } from '../../../../../state/window/store';
import { BasicLazyImage } from '../../../../core/image';
import { BasicLink } from '../../../../core/link';
import { SlideTemplate } from '../slideTemplate';
import { entelectSlideBackground, entelectSlideBackgroundLookup, iframeSlide, imgSlide } from './common';

export const EntelectTechAndBorrel2022WorkLifeSlides: React.FC<ISlideProps> = (props: ISlideProps) => {
    return (
        <SlideTemplate
            isFocused={props.isFocused}
            bgRender={(backgroundId: string, index: number): ReactNode | void => {
                if (entelectSlideBackgroundLookup[backgroundId] != null) return entelectSlideBackgroundLookup[backgroundId].render();
                return entelectSlideBackground;
            }}
            slides={[
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <>
                            <Center flexDirection="column">
                                <Text fontSize="4xl" textAlign="center">Entelect<br />Tech & Borrel</Text>
                                <br /><br />
                                <Text fontSize="2xl" textAlign="center">Work</Text>
                            </Center>
                        </>
                    ),
                },
                imgSlide(Presentation.bootcamp20171, 'bootcamp2017 1'),
                imgSlide(Presentation.bootcamp20172, 'bootcamp2017 2'),
                imgSlide(Presentation.workHollard, 'Hollard', entelectSlideBackgroundLookup.greyBackground.id),
                {
                    backgroundId: entelectSlideBackgroundLookup.greyBackground.id,
                    render: () => (
                        <Center>
                            <BasicLazyImage imageUrl={Presentation.workBee123} alt="BEE123" style={{ borderRadius: '1em', margin: '2em', maxWidth: '80vw', maxHeight: '80vh' }} />
                            <Box margin="2em"></Box>
                            <VStack>
                                <Text fontSize="4xl" textAlign="center">Notable acheivements</Text>
                                <br />
                                <UnorderedList fontSize="xl">
                                    <ListItem>
                                        <Text>Dropped a Production database (unable to restore from backup)</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Moved from on-prem to Azure</Text>
                                    </ListItem>
                                    <ListItem>
                                        <BasicLink href="#" onClick={() => WindowStore.update(openApp(AppletType.presentation, LocaleKey.presentation, {
                                            src: 'https://presentation.kurtlourens.com/BEE123/ReactMigration/#11',
                                            icon: AppletIcon.presentation,
                                            defaultHeight: 700,
                                            defaultWidth: 900,
                                        }))}
                                        >Migration from Durandal to React</BasicLink>
                                    </ListItem>
                                </UnorderedList>
                            </VStack>
                        </Center>
                    ),
                },
                imgSlide(Presentation.workBee123GetGood, 'BEE123 legacy'),
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">We emmigrated to <img src={Presentation.nl} alt="nl" style={{ display: 'inline-block', marginBottom: '-0.15em', height: '1em' }} /></Text>
                            <BasicLazyImage imageUrl={Presentation.flyToAmsterdam} alt="fly To Amsterdam" style={{ borderRadius: '1em', margin: '2em', maxWidth: '80vw', maxHeight: '80vh' }} />
                        </Center>
                    ),
                },
                iframeSlide(iframesInSlides.flevoland, 'flevoland'),
                {
                    backgroundId: entelectSlideBackgroundLookup.rabobank.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Box marginRight="50%" marginBottom="10%">
                                <Text fontSize="5xl">TAS</Text>
                                <Text fontSize="2xl">Atlas</Text>
                                <Text fontSize="xl">Dec 2021 - Dec 2022</Text>
                                <br /><br />
                                <Text fontSize="5xl">Digital Platform</Text>
                                <Text fontSize="2xl">Nomads</Text>
                                <Text fontSize="xl">Dec 2022 - current</Text>
                            </Box>
                        </Center>
                    ),
                },
            ]}
        />
    );
}
