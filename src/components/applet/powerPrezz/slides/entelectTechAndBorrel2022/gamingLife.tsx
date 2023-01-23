import { CheckIcon } from '@chakra-ui/icons';
import { Button, Center, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { ExternalImage, Presentation } from '../../../../../constants/appImage';
import { ISlideProps } from '../../../../../constants/slides';
import { getScreenshareStream } from '../../../../../helper/screenshareHelper';
import { BasicImage } from '../../../../core/image';
import { ScreenshareWindow } from '../../../../special/screenshareWindow';
import { SlideTemplate } from '../slideTemplate';
import { entelectSlideBackground, entelectSlideBackgroundLookup } from './common';

export const EntelectTechAndBorrel2022GamingLifeSlides: React.FC<ISlideProps> = (props: ISlideProps) => {
    const [setupModalIsOpen, setSetupModalIsOpen] = useState<boolean>(false);
    const [satisfactoryStream, setSatisfactoryStream] = useState<MediaStream | undefined>();
    const [otherStream, setOtherStream] = useState<MediaStream | undefined>();

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
                                <Text fontSize="2xl" textAlign="center">Hobbies & Gaming</Text>
                            </Center>
                            <Button position="absolute" top="1em" right="1em" onClick={() => setSetupModalIsOpen(true)}>⚙️</Button>
                            <Modal isOpen={setupModalIsOpen} onClose={() => setSetupModalIsOpen(false)}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader className="noselect">Setup</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody textAlign="center">
                                        <Button onClick={() => getScreenshareStream((strm) => setSatisfactoryStream(strm))}
                                            leftIcon={satisfactoryStream != null ? <CheckIcon /> : undefined}>Satisfactory stream</Button>
                                        <br />
                                        <br />
                                        <Button onClick={() => getScreenshareStream((strm) => setOtherStream(strm))}
                                            leftIcon={otherStream != null ? <CheckIcon /> : undefined}>Other stream</Button>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="3xl">My hobbies<br /><br /></Text>
                            <img src={Presentation.hobbies} alt="hobbies" style={{ borderRadius: '1em' }} />
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.gaming.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">Gaming 🎮</Text>
                            <Text fontSize="lg">&nbsp;</Text>
                            <BasicImage imageUrl={ExternalImage.steamKhaozTopsyReplay2022} alt="KhaozTopsy steam Replay 2022" style={{ borderRadius: '1em' }} />
                        </Center>
                    ),
                },
                {
                    skip: satisfactoryStream == null,
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_: any) => (
                        <ScreenshareWindow stream={satisfactoryStream} />
                    ),
                },
                {
                    skip: otherStream == null,
                    backgroundId: entelectSlideBackgroundLookup.default.id,
                    render: (_) => (
                        <ScreenshareWindow stream={otherStream} />
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.gaming.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">Arduino tweaking 🤖</Text>
                            <Text fontSize="lg">&nbsp;</Text>
                            <HStack className="img-row">
                                <BasicImage imageUrl={Presentation.watch1} alt="watch1" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.watch2} alt="watch2" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.watch3} alt="watch3" style={{ borderRadius: '1em' }} />
                            </HStack>
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.gaming.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">Arduino tweaking 🤖</Text>
                            <Text fontSize="lg">&nbsp;</Text>
                            <HStack className="img-row large">
                                <BasicImage imageUrl={Presentation.deskWatch1} alt="deskWatch1" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.deskWatch2} alt="deskWatch2" style={{ borderRadius: '1em' }} />
                            </HStack>
                            <Text fontSize="lg">&nbsp;</Text>
                            <Text>⏲️ Time<br /> 🔋 Battery powered<br /></Text>
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.gaming.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">Arduino tweaking 🤖</Text>
                            <Text fontSize="lg">&nbsp;</Text>
                            <HStack className="img-row small">
                                <BasicImage imageUrl={Presentation.waterSys1} alt="waterSys1" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.waterSys2} alt="waterSys2" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.waterSys3} alt="waterSys3" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl={Presentation.waterSys4} alt="waterSys4" style={{ borderRadius: '1em' }} />
                            </HStack>
                            <Text fontSize="lg">&nbsp;</Text>
                            <Text>💧 Humidity<br /> 🌡️ Temperature<br /> 🚿 Sprinkler<br /> ☁️ Actions based on weather</Text>
                        </Center>
                    ),
                },
                {
                    backgroundId: entelectSlideBackgroundLookup.gaming.id,
                    render: (_) => (
                        <Center flexDirection="column">
                            <Text fontSize="4xl">Side projects 🚀</Text>
                            <Text fontSize="lg">&nbsp;</Text>
                            <HStack className="img-row">
                                <BasicImage imageUrl="https://cdn.assistantapps.com/icon/assistantNMS.webp" alt="assistantNMS" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl="https://cdn.assistantapps.com/icon/assistantSMS.webp" alt="assistantSMS" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl="https://cdn.assistantapps.com/icon/assistantHyt.webp" alt="assistantHyt" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl="https://cdn.assistantapps.com/icon/assistantDKM.png" alt="assistantDKM" style={{ borderRadius: '1em' }} />
                                <BasicImage imageUrl="https://cdn.assistantapps.com/icon/assistantApps.png" alt="assistantApps" style={{ borderRadius: '1em' }} />
                            </HStack>
                        </Center>
                    ),
                },
            ]}
        />
    );
}
