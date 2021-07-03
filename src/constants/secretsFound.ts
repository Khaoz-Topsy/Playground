import { LocaleKey } from '../localization/LocaleKey';
import { FoundSecretType } from './enum/foundSecretType';

export const getSecretsFound = (secretsFound: Array<FoundSecretType>) => [
    {
        name: LocaleKey.clippy,
        type: FoundSecretType.clippy,
        howTo: LocaleKey.clippySecretDescription,
        isFound: secretsFound.includes(FoundSecretType.clippy),
    },
    {
        name: LocaleKey.nyanCat,
        type: FoundSecretType.nyanCat,
        howTo: LocaleKey.nyanCatSecretDescription,
        isFound: secretsFound.includes(FoundSecretType.nyanCat),
    },
    {
        name: LocaleKey.harlemShake,
        type: FoundSecretType.harlemShake,
        howTo: LocaleKey.harlemShakeSecretDescription,
        isFound: secretsFound.includes(FoundSecretType.harlemShake),
    }
]