import React, { useState, useRef } from 'react';
import { Box, Container } from '@chakra-ui/react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { site } from '../../../constants/site';
import { IApplet } from '../../../contracts/interface/IApplet';
import { NetworkState } from '../../../constants/enum/networkState';
import { withServices } from '../../../integration/dependencyInjection';

import { dependencyInjectionToProps, IExpectedServices } from './emailApplet.dependencyInjection';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

interface IState {
    networkState: NetworkState;
}

export const NewEmailPopupUnconnected: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        networkState: NetworkState.Loading,
    });

    const captchaRef: any = useRef();

    return (
        <Container maxW={"container.xl"}>
            <Box mt={4}>
                <HCaptcha
                    ref={captchaRef}
                    sitekey={site.captchaKey}
                    theme="dark"
                    size="invisible"
                    onVerify={(token: string) => {
                        (captchaRef?.current as any)?.resetCaptcha();
                    }}
                />
            </Box>
        </Container>
    );
}

export const NewEmailPopup = withServices<IWithoutExpectedServices, IExpectedServices>(
    NewEmailPopupUnconnected,
    dependencyInjectionToProps
);
