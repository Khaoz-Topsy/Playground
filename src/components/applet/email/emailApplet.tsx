import React, { useEffect, useState, ReactNode } from 'react';
import { Badge, Center } from '@chakra-ui/react';
import classNames from 'classnames';

import { IApplet } from '../../../contracts/interface/IApplet';
import { ISavedEmail } from '../../../contracts/interface/ISavedEmail';
import { JsonFile } from '../../../constants/jsonFile';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { NetworkState } from '../../../constants/enum/networkState';
import { LoadingImage } from '../../../components/core/loader';
import { MarkdownContent } from '../../core/markdown';
import { sortByPropAsc } from '../../../helper/sortHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { EmailStore } from '../../../state/email/store';
import { Applet } from '../../window/applet/applet';

import { dependencyInjectionToProps, IExpectedServices } from './emailApplet.dependencyInjection';
import { NewEmailPopup } from './newEmailPopup';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../integration/i18n';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

interface IState {
    networkState: NetworkState;
    selectedEmailIndex: number;
    emails: Array<ISavedEmail>;
}

export const EmailAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const savedEmails: Array<ISavedEmail> = EmailStore.useState(store => store.savedEmails);
    const [state, setState] = useState<IState>({
        networkState: NetworkState.Pending,
        selectedEmailIndex: -1,
        emails: [],
    });

    useEffect(() => {
        if (state?.emails != null && (state?.emails?.length ?? 0) > 0) return;
        getContentFromDataService();
        // eslint-disable-next-line
    });

    const getContentFromDataService = async () => {
        const netResult: ResultWithValue<Array<ISavedEmail>> = await props.dataService.getJsonFile<Array<ISavedEmail>>(JsonFile.emailsReceived);
        if (!netResult.isSuccess) {
            setState({ ...state, networkState: NetworkState.Error });
            return;
        }

        setState({
            networkState: NetworkState.Success,
            emails: netResult.value,
            selectedEmailIndex: (netResult.value.length > 0) ? 0 : -1
        });
    }

    const renderSidebar = (localState: IState, localAllEmails: Array<ISavedEmail>): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return LoadingImage(true);

        return (
            <div className="email-box noselect">
                {
                    localAllEmails.map((email: ISavedEmail, index: number) => (
                        <div
                            key={email.guid}
                            className={classNames('item', { 'selected': index === state.selectedEmailIndex })}
                            onClick={() => setState({ ...state, selectedEmailIndex: index })}
                        >
                            <div className="item-content">
                                <div className="sender-info">
                                    <div className="first-row">
                                        <span className="from">{email.name}</span>
                                        {
                                            email.isSpam &&
                                            <span className="spam" style={{ marginTop: '3px', marginRight: '7.5px' }}>
                                                <Badge colorScheme="red">{translate(LocaleKey.spamEmail)}</Badge>
                                            </span>
                                        }
                                        {
                                            email.isPending &&
                                            <span className="pending" style={{ marginTop: '3px', marginRight: '7.5px' }}>
                                                <Badge colorScheme="blue">{translate(LocaleKey.pendingEmail)}</Badge>
                                            </span>
                                        }
                                        <span className="date">{email.date}</span>
                                    </div>
                                    <p>{email.shortMessage}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <NewEmailPopup />
            </div>
        );
    }

    const renderBody = (localState: IState, localAllEmails: Array<ISavedEmail>): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return (
            <Center className="mt3">{LoadingImage(true)}</Center>
        );
        if (localState.selectedEmailIndex < 0 || localAllEmails?.[localState.selectedEmailIndex] == null) return (
            <Center className="mt1">Error displaying email message</Center>
        );

        return (<div className="notes-viewer p1">
            <MarkdownContent content={localAllEmails?.[localState.selectedEmailIndex]?.message} />
        </div>
        );
    }

    const allEmails: Array<ISavedEmail> = sortByPropAsc([...savedEmails, ...state.emails], 'date');
    return (
        <Applet
            key="email-list"
            {...props}
            isFullscreen={true}
            classNames="emails"
            sidebar={renderSidebar(state, allEmails)}
        >
            <div key="email-list-content" className="email-list-content noselect">
                {renderBody(state, allEmails)}
            </div>
        </Applet>
    );
}

export const EmailApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    EmailAppletUnconnected,
    dependencyInjectionToProps
);
