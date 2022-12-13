import { CheckIcon } from '@chakra-ui/icons';
import { Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { AppletIcon, FileIcon, getImageUrlsFromImageClass } from '../../../constants/appImage';
import { defaultHeight, defaultWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet';
import { getScreenshareStream } from '../../../helper/screenshareHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { setMetaForApp } from '../../../state/window/reducer';
import { WindowStore } from '../../../state/window/store';
import { BasicImage } from '../../core/image';
import { ScreenshareWindow } from '../../special/screenshareWindow';
import { Applet } from '../../window/applet/applet';

interface IProps extends IApplet {
}

export const ScreenshareViewerApplet: React.FC<IProps> = (props: IProps) => {
    const [stream, setStream] = useState<MediaStream | undefined>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSelectImage = (imgUrl: string) => (e: any) => {
        WindowStore.update(str => setMetaForApp(str, props.guid, { ...props.meta, customImgUrl: imgUrl }));
        onClose();
    }
    const onSetName = (name: string) => WindowStore.update(str => setMetaForApp(str, props.guid, { ...props.meta, customName: name }));

    const renderContent = (localProps: IProps) => {
        const imageUrl = localProps.meta?.customImgUrl;
        const customName = localProps.meta?.customName;
        if (stream != null && imageUrl?.length > 2 && customName?.length > 2) {
            return (
                <ScreenshareWindow stream={stream} />
            );
        }

        return (
            <Center flexDirection="column">
                <Text fontSize="2xl" textAlign="center">Setup</Text>
                <br />
                <FormControl pl={5} pr={5} width="50%">
                    <FormLabel>{translate(LocaleKey.newEmailName)}</FormLabel>
                    <Input onChange={(e: any) => onSetName(e?.target?.value ?? 'Unknown')} />
                </FormControl>
                <br />
                <Button onClick={onOpen}
                    leftIcon={imageUrl != null ? <CheckIcon /> : undefined}>Set app icon</Button>
                <br />
                <Button onClick={() => getScreenshareStream((strm) => setStream(strm))}
                    leftIcon={stream != null ? <CheckIcon /> : undefined}>Screenshare stream</Button>
            </Center>
        );
    }

    const allImageOptioons = [
        ...getImageUrlsFromImageClass(AppletIcon),
        ...getImageUrlsFromImageClass(FileIcon),
    ].filter((value, index, self) => self.indexOf(value) === index);
    allImageOptioons.sort((a, b) => a.localeCompare(b));

    return (
        <Applet
            key="screenshareViewer"
            {...props}
            defaultHeight={defaultHeight}
            defaultWidth={defaultWidth}
            classNames="screenshare-viewer"
            isFullscreen={true}
        >
            {renderContent(props)}
            <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select image or paste an image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={5}>
                        <SimpleGrid minChildWidth="50px" spacing="40px">
                            {
                                allImageOptioons.map((url) => (<BasicImage key={url} imageUrl={url} onClick={onSelectImage(url)} />))
                            }
                        </SimpleGrid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Applet>
    );
}
