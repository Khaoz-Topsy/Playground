import { Store } from 'pullstate';
import { secretFoundToast } from '../components/core/toast';
import { FoundSecretType } from '../constants/enum/foundSecretType';
import { ISecretStore } from '../state/secrets/store';

interface IAddSecretIfNotFound {
    secretStore: Store<ISecretStore>;
    currentSecretsFound: Array<FoundSecretType>;
    secretToAdd: FoundSecretType;
    callbackIfNotExists?: () => void;
    callbackFinally?: () => void;
}
export const addSecretIfNotFound = (props: IAddSecretIfNotFound) => {
    if (!props.currentSecretsFound.includes(props.secretToAdd)) {
        secretFoundToast(props.secretToAdd);
        props.secretStore.update((store: ISecretStore) => {
            store.secretsFound = [...store.secretsFound, props.secretToAdd];
        });
        props.callbackIfNotExists?.();
    }
    props.callbackFinally?.();
};