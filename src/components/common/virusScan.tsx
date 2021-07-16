import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import classNames from "classnames";
import React, { useEffect } from "react";
import { useState } from "react";
import { FileIcon } from "../../constants/appImage";
import { translate } from "../../integration/i18n";
import { LocaleKey } from "../../localization/LocaleKey";
import { BasicImage } from "../core/image";

interface IVirusScanProps {
    name?: LocaleKey;
    imgUrl?: string;
    onClose: () => void;
}

export const VirusScan: React.FC<IVirusScanProps> = (props: IVirusScanProps) => {
    const [isScanning, setScanning] = useState(true);

    useEffect(() => {
        if (!isScanning) return;

        const milliSeconds = (Math.random() * 2000) + 4000; // between 4 - 6 seconds
        const timeout = setTimeout(() => setScanning(false), milliSeconds);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    });

    const renderStatusTemplate = (key: string, template: LocaleKey, name: LocaleKey, classNames: string = '') => {
        return (
            <p key={key} className={classNames}>
                {
                    translate(template).split(' ').map((word: string, index: number) => (
                        (word === '{0}')
                            ? <b key={`${word}-${index}`}>{translate(name)}</b>
                            : <span key={`${word}-${index}`}>&nbsp;{word}</span>
                    ))
                }
            </p>
        );
    }

    const renderStatusMsg = (name: LocaleKey) => isScanning
        ? renderStatusTemplate('scanningMsg', LocaleKey.virusScanInProgress, name, 'scanning')
        : renderStatusTemplate('scanningCompleteMsg', LocaleKey.virusScanIsClean, name);

    return (
        <ModalContent>
            <ModalHeader>{translate(LocaleKey.virusScan)}</ModalHeader>
            {
                (isScanning === false) &&
                <ModalCloseButton onClick={props.onClose} />
            }
            <ModalBody>
                <div className={classNames('virus-scan', 'no-border', { 'complete': isScanning })}>
                    <BasicImage
                        imageUrl={FileIcon.success}
                        classNames="virus-scan-success"
                        alt="virus scan complete"
                    />
                </div>
                <div className={classNames('virus-scan', { 'complete': !isScanning })}>
                    <em></em>
                    <div>
                        <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                        <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                    </div>
                    <span></span>
                    {
                        props.imgUrl != null && <BasicImage imageUrl={props.imgUrl} alt="virus scan" />
                    }
                </div>

                {
                    (props?.name != null)
                        ? renderStatusMsg(props.name)
                        : <span></span>
                }
            </ModalBody>
            {
                (isScanning === false) &&
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        onClick={props.onClose}>
                        {translate(LocaleKey.close)}
                    </Button>
                </ModalFooter>
            }
        </ModalContent>
    );
}