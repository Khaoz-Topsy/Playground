import React from 'react';
import { Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { BasicLazyImage } from '../../core/image';
import { windowIcon } from '../windowIcon';
import { SpotlightSearchResultMeta } from '../../common/spotlight/spotlightSearchResultMeta';
import { AppletType } from '../../../constants/enum/appletType';

interface IAppletDetailProps {
    applet?: IAppletFile;
    isOpen: boolean;
    onClose: () => void;
}

export const AppletDetail: React.FC<IAppletDetailProps> = (props: IAppletDetailProps) => {

    const renderAppImage = (applet?: IAppletFile) => {
        if (applet == null) return windowIcon(AppletType.setting);
        if (applet?.imgUrl != null) return <BasicLazyImage imageUrl={applet.imgUrl} alt={applet.name.toString()} />;

        return windowIcon(applet.appletType, applet.meta?.customImgUrl);
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{translate(LocaleKey.properties)}</ModalHeader>
                <ModalCloseButton onClick={props.onClose} />
                <ModalBody>
                    <div className="properties-modal">
                        <div className="main">
                            <div className="img-container">
                                {renderAppImage(props.applet)}
                            </div>
                            <div className="content">
                                <h1>{props.applet?.name && translate(props.applet.name)}</h1>
                                {props.applet?.id && <p>Id:&nbsp;{props.applet.id}</p>}
                            </div>
                        </div>
                        <Divider mx="auto" mt="1.5em" mb={2} opacity={0.25} />
                        <SpotlightSearchResultMeta searchResult={props.applet} hideImage={true} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        onClick={props.onClose}>
                        {translate(LocaleKey.close)}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}