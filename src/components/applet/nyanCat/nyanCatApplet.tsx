import React from 'react'
import { FoundSecretType } from '../../../constants/enum/foundSecretType';

import { secretFoundToast } from '../../core/toast';
import { IApplet } from '../../../contracts/interface/IApplet'
import { IFrameApplet } from '../iframe/iframeApplet';
import { withServices } from '../../../integration/dependencyInjection';
import { PullstateCore } from '../../../state/stateCore';
import { ISecretStore } from '../../../state/secrets/store';

import { dependencyInjectionToProps, IExpectedServices } from './nyanCat.dependencyInjection';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices { }

export const NyanCatAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const { SecretStore } = PullstateCore.useStores();
    const secretsFound = SecretStore.useState(store => store.secretsFound);

    if (!secretsFound.includes(FoundSecretType.nyanCat)) {
        secretFoundToast(FoundSecretType.nyanCat);
        SecretStore.update((store: ISecretStore) => {
            store.secretsFound = [...store.secretsFound, FoundSecretType.nyanCat];
        });
    }

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
