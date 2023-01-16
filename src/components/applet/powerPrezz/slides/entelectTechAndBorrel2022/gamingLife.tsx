import { CheckIcon } from '@chakra-ui/icons';
import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { ISlideProps } from '../../../../../constants/slides';
import { getScreenshareStream } from '../../../../../helper/screenshareHelper';
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
                                <Text fontSize="2xl" textAlign="center">Gaming</Text>
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
            ]}
        />
    );
}
