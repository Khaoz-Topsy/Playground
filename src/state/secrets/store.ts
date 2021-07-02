import { Store } from "pullstate";
import { FoundSecretType } from "../../constants/enum/foundSecretType";

export interface ISecretStore {
    secretsFound: Array<FoundSecretType>;
}

export const SecretStore = new Store<ISecretStore>({
    secretsFound: [],
});