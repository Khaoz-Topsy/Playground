import { Store } from 'pullstate';
import { secretFoundToast } from '../components/core/toast';
import { FoundSecretType } from '../constants/enum/foundSecretType';
import { ISecretStore } from '../state/secrets/store';
// import { secretsFound } from '../constants/secretsFound';
// import { translate } from '../integration/i18n';
// import { LocaleKey } from '../localization/LocaleKey';

interface IAddSecretIfNotFound {
    secretStore: Store<ISecretStore>;
    currentSecretsFound: Array<FoundSecretType>;
    secretToAdd: FoundSecretType;
    toastFunc: (opts: any) => void;
    callbackIfNotExists?: () => void;
    callbackFinally?: () => void;
}
export const addSecretIfNotFound = (props: IAddSecretIfNotFound) => {
    if (!props.currentSecretsFound.includes(props.secretToAdd)) {
        debugger;
        secretFoundToast(props.secretToAdd);

        // const foundSecret = secretsFound.find(s => s.type === props.secretToAdd);
        // if (foundSecret == null) return;
        // props.toastFunc({
        //     title: 'Secret found!',
        //     description: translate(foundSecret.howTo?.[0] ?? LocaleKey.unknown),
        //     status: 'info',
        //     duration: 10000,
        //     isClosable: true,
        //     position: 'bottom-right',
        // })
        props.secretStore.update((store: ISecretStore) => {
            store.secretsFound = [...store.secretsFound, props.secretToAdd];
        });
        props.callbackIfNotExists?.();
    }
    props.callbackFinally?.();
};