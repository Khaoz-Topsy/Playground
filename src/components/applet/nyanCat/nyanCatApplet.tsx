import React from 'react'
import { FoundSecretType } from '../../../constants/enum/foundSecretType';

import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';
import { withServices } from '../../../integration/dependencyInjection';
import { PullstateCore } from '../../../state/stateCore';
import { addSecretIfNotFound } from '../../../helper/secretFoundHelper';

import { dependencyInjectionToProps, IExpectedServices } from './nyanCat.dependencyInjection';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

export const NyanCatAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const { SecretStore } = PullstateCore.useStores();
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);

    addSecretIfNotFound({
        secretStore: SecretStore,
        currentSecretsFound,
        secretToAdd: FoundSecretType.nyanCat,
    });

    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { pointerEvents: 'none', zIndex: 2 },
                key: "nyancat-iframe",
                src: "https://cristurm.github.io/nyan-cat/"
            }}
        />
    );
}

export const NyanCatApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    NyanCatAppletUnconnected,
    dependencyInjectionToProps
);
