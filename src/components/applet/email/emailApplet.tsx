import React, { useEffect, useState, ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

import { IApplet } from '../../../contracts/interface/IApplet';
import { SavedEmail } from '../../../contracts/implementation/savedEmail';
import { JsonFile } from '../../../constants/jsonFile';
import { NetworkState } from '../../../constants/enum/networkState';
import { LoadingImage } from '../../../components/core/loader';
import { Applet } from '../../window/applet/applet';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './emailApplet.dependencyInjection';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

interface IState {
    networkState: NetworkState;
    emails: Array<SavedEmail>;
}

export const EmailAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        networkState: NetworkState.Loading,
        emails: [],
    });

    useEffect(() => {
        getContentFromDataService();
        // eslint-disable-next-line
    });

    const getContentFromDataService = async () => {
        const netResult: ResultWithValue<Array<SavedEmail>> = await props.dataService.getJsonFile<Array<SavedEmail>>(JsonFile.emailsReceived);
        if (!netResult.isSuccess) {
            setState({ ...state, networkState: NetworkState.Error });
            return;
        }
        setState({ networkState: NetworkState.Success, emails: netResult.value });
    }

    const renderBody = (localState: IState): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return LoadingImage(true);

        return (
            <ul>
                {
                    localState.emails.map(e => (
                        <li key={e.guid}>
                            {e.name}
                        </li>
                    ))
                }
            </ul>
        );
    }

    return (
        <Applet
            key="email-list"
            {...props}
        >
            <Container maxW={"container.xl"}>
                <Box mt={4}>
                    {renderBody(state)}
                </Box>
            </Container>
        </Applet>
    );
}

export const EmailApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    EmailAppletUnconnected,
    dependencyInjectionToProps
);
