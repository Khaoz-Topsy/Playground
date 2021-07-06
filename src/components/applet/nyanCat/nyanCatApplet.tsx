import React from 'react'
import { useToast } from '@chakra-ui/react';

import { FoundSecretType } from '../../../constants/enum/foundSecretType';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';
import { withServices } from '../../../integration/dependencyInjection';
import { getIframeUrl } from '../../../helper/iframeHelper';
import { addSecretIfNotFound } from '../../../helper/secretFoundHelper';
import { SecretStore } from '../../../state/secrets/store';

import { dependencyInjectionToProps, IExpectedServices } from './nyanCat.dependencyInjection';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

export const NyanCatAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const toastFunc = useToast();

    addSecretIfNotFound({
        secretStore: SecretStore,
        currentSecretsFound,
        toastFunc,
        secretToAdd: FoundSecretType.nyanCat,
    });

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { pointerEvents: 'none', zIndex: 2 },
                key: "nyancat-iframe",
                src: getIframeUrl(props),
            }}
        />
    );
}

export const NyanCatApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    NyanCatAppletUnconnected,
    dependencyInjectionToProps
);
