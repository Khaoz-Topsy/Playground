import React, { useState, useRef } from 'react';
import { Chip, TextField } from '@material-ui/core';
import {
    Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay, useToast
} from '@chakra-ui/react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { site } from '../../../constants/site';
import { ContactFormViewModel } from '../../../contracts/generated/ViewModel/contactFormViewModel';
import { NetworkState } from '../../../constants/enum/networkState';
import { currentShortDate } from '../../../helper/dateHelper';
import { newGuid } from '../../../helper/guidHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { EmailStore } from '../../../state/email/store';

import { dependencyInjectionToProps, IExpectedServices } from './emailApplet.dependencyInjection';

interface IWithoutExpectedServices {
    isOpen: boolean;
    onClose: () => void;
};
interface IProps extends IExpectedServices, IWithoutExpectedServices { }

const initialState = {
    name: '',
    email: '',
    message: '',
    networkState: NetworkState.Pending,
};

interface IState {
    name: string;
    email: string;
    message: string;
    networkState: NetworkState;
}

export const NewEmailPopupUnconnected: React.FC<IProps> = (props: IProps) => {
    const toastFunc = useToast();
    const [state, setState] = useState<IState>(initialState);
    const captchaRef: any = useRef();

    const editField = (fieldName: string) => (e: any) => {
        setState({ ...state, [fieldName]: e?.target?.value ?? '' });
    }

    const sendInContactForm = () => {
        // setState({ ...state, networkState: NetworkState.Loading });
        (captchaRef?.current as any)?.execute?.();
    }

    const customClose = () => {
        setState(initialState);
        (captchaRef?.current as any)?.resetCaptcha();
        props?.onClose?.();
    }

    const { name, email, message, networkState } = state;
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={customClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="noselect">{translate(LocaleKey.newEmail)}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form noValidate autoComplete="off">
                            <span className="noselect" style={{ marginRight: '0.5em' }}>To:</span>
                            <Chip
                                avatar={<Avatar alt={site.kurt.fullName} src={site.kurt.profilePic} />}
                                label={site.kurt.fullName}
                                className="noselect"
                                color="primary"
                            />
                            <TextField
                                id="from"
                                label={translate(LocaleKey.newEmailFrom)}
                                value={email}
                                onChange={editField('email')}
                                style={{ width: '100%', marginTop: '0.25em' }}
                            />
                            <TextField
                                id="message"
                                label={translate(LocaleKey.newEmailMessage)}
                                value={message}
                                onChange={editField('message')}
                                style={{ width: '100%', marginTop: '1em' }}
                                multiline
                            />
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <TextField
                            id="name"
                            label={translate(LocaleKey.newEmailName)}
                            value={name}
                            onChange={editField('name')}
                            style={{ paddingRight: '1em', paddingBottom: '0.5em', marginBottom: '0.5em' }}
                        />
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            isLoading={networkState === NetworkState.Loading}
                            loadingText={translate(LocaleKey.newEmailSending)}
                            onClick={sendInContactForm}>
                            {translate(LocaleKey.newEmailSend)}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <HCaptcha
                ref={captchaRef}
                sitekey={site.captchaKey}
                theme="dark"
                size="invisible"
                onVerify={async (captcha: string) => {
                    setState({ ...state, networkState: NetworkState.Loading });
                    const { name, email, message } = state;
                    const contactForm: ContactFormViewModel = { name, email, message, captcha };
                    const contactFormSubmitResult = await props.assistantAppsService.submitContactForm(contactForm);
                    if (!contactFormSubmitResult.isSuccess) {
                        toastFunc({
                            title: translate(LocaleKey.failedToSendEmail),
                            status: 'error',
                            isClosable: true,
                        });
                        return;
                    }

                    EmailStore.update(store => {
                        store.savedEmails.push({
                            guid: newGuid(),
                            name,
                            email,
                            message,
                            date: currentShortDate(),
                            shortMessage: message,
                            isPending: true,
                            isSpam: false,
                        });
                        return store;
                    })
                    customClose();
                    toastFunc({
                        title: translate(LocaleKey.successfulSendEmail),
                        status: 'success',
                        isClosable: true,
                    });
                }}
                onError={() => {
                    setState({ ...state, networkState: NetworkState.Pending });
                }}
            />
        </>
    );
}

export const NewEmailPopup = withServices<IWithoutExpectedServices, IExpectedServices>(
    NewEmailPopupUnconnected,
    dependencyInjectionToProps
);
