import { Button, Center, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Presentation } from '../../../../../constants/appImage';
import { iframesInSlides } from '../../../../../constants/slides';
import { SlideTemplate } from '../slideTemplate';
import { entelectSlideBackground, entelectSlideBackgroundLookup, iframeSlide, imgSlide } from './common';
import { EarlyLifeFlightToMaliSlide } from './earlyLifeFlightToMali';

interface IProps {
    isFocused?: boolean;
}

export const EntelectTechAndBorrel2022EarlyLifeSlides: React.FC<IProps> = (props: IProps) => {

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
                        <Center>
                            <Text fontSize="4xl" textAlign="center">Entelect<br />Tech & Borrel</Text>
                        </Center>
                    ),
                },
                imgSlide(Presentation.family3, 'family3'),
                imgSlide(Presentation.welkom1, 'welkom1'),
                iframeSlide(iframesInSlides.koppieAlleen, 'koppie alleen'),
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: () => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl" textAlign="center">My dad:</Text>
                            <img src={Presentation.gold} alt="gold" style={{ borderRadius: '1em', margin: '2em' }} />
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.googleEarthWater.id,
                    render: (paginate) => (
                        <EarlyLifeFlightToMaliSlide paginate={paginate} />
                    ),
                },
                iframeSlide(iframesInSlides.sadiolla, 'sadiolla'),
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center>
                            <video src={Presentation.sadiolaGold} autoPlay={true} loop={false} controls style={{ height: '100%' }}></video>
                        </Center>
                    ),
                },
                // {
                //     backgroundId: bgLookup.googleEarthWater.id,
                //     render: (paginate) => (
                //         <EarlyLifeFlightToMaliSlide paginate={paginate} isReverse={true} />
                //     ),
                // },
                // {
                //     backgroundId: bgLookup.default.id,
                //     render: (_) => (
                //         <Center flexDirection="column">
                //             <Text fontSize="4xl" textAlign="center">Primary school</Text>
                //             <Text fontSize="2xl" textAlign="center">Grade 1 - 4</Text>
                //         </Center>
                //     ),
                // },
                // {
                //     backgroundId: bgLookup.googleEarthWater.id,
                //     render: (paginate) => (
                //         <EarlyLifeFlightToMaliSlide paginate={paginate} />
                //     ),
                // },
                iframeSlide(iframesInSlides.morilla, 'morilla'),
                imgSlide(Presentation.school2007, 'school2007'),
                imgSlide(Presentation.mx, 'mx'),
                imgSlide(Presentation.kilimanjaro, 'kilimanjaro'),
                imgSlide(Presentation.fish, 'fish'),
                {
                    backgroundId: entelectSlideBackgroundLookup.googleEarthWater.id,
                    render: (paginate) => (
                        <EarlyLifeFlightToMaliSlide paginate={paginate} isReverse={true} />
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center>
                            <video src={Presentation.studyingAtUJ} autoPlay={true} loop={false} muted style={{ height: '100%' }}></video>
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (paginate) => (
                        <Center>
                            <div>
                                <Text fontSize="2xl">Tester test</Text>
                                <Button onClick={() => paginate(-2)}>Hi</Button>
                            </div>
                        </Center>
                    ),
                },
            ]}
        />
    );
}
