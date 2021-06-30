import React, { useEffect, useState, ReactNode } from 'react';
import { Badge, Center } from '@chakra-ui/react';
import classNames from 'classnames';
// import HCaptcha from '@hcaptcha/react-hcaptcha';

import { IApplet } from '../../../contracts/interface/IApplet';
import { SavedEmail } from '../../../contracts/implementation/savedEmail';
import { JsonFile } from '../../../constants/jsonFile';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { NetworkState } from '../../../constants/enum/networkState';
import { LoadingImage } from '../../../components/core/loader';
import { MarkdownContent } from '../../core/markdown';
import { withServices } from '../../../integration/dependencyInjection';
import { WindowHeader } from '../../window/windowHeader';
import { windowIcon } from '../../window/windowIcon';
import { Window } from '../../window/window';

import { dependencyInjectionToProps, IExpectedServices } from './emailApplet.dependencyInjection';
import { NewEmailPopup } from './newEmailPopup';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

interface IState {
    networkState: NetworkState;
    selectedEmailIndex: number;
    emails: Array<SavedEmail>;
}

export const EmailAppletUnconnected: React.FC<IProps> = (props: IProps) => {
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
        const netResult: ResultWithValue<Array<SavedEmail>> = await props.dataService.getJsonFile<Array<SavedEmail>>(JsonFile.emailsReceived);
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

    const renderSidebar = (localState: IState): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return LoadingImage(true);

        return (
            <div className="email-box">
                {
                    localState.emails.map((email: SavedEmail, index: number) => (
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
                                                <Badge colorScheme="red">SPAM</Badge>
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

    const renderBody = (localState: IState): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return (
            <Center className="mt3">{LoadingImage(true)}</Center>
        );
        if (localState.selectedEmailIndex < 0 || localState.emails?.[localState.selectedEmailIndex] == null) return (
            <Center className="mt1">Error displaying email message</Center>
        );

        return (<div className="notes-viewer p1">
            <MarkdownContent content={localState.emails?.[localState.selectedEmailIndex]?.message} />
        </div>
        );
    }

    return (
        <Window
            key="email-list"
            {...props}
            isFullscreen={true}
            classNames="emails"
            headerFunc={() => <WindowHeader {...props} windowIcon={windowIcon(props.appletType)} />}
            sidebar={renderSidebar(state)}
        >
            <div key="email-list-content" className="email-list-content">
                {renderBody(state)}
            </div>
        </Window>
    );
}

export const EmailApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    EmailAppletUnconnected,
    dependencyInjectionToProps
);
