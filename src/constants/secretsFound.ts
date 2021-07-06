import { LocaleKey } from '../localization/LocaleKey';
import { FoundSecretType } from './enum/foundSecretType';

export const secretsFound = [
    {
        name: LocaleKey.clippy,
        type: FoundSecretType.clippy,
        howTo: [
            LocaleKey.clippySecretSettingsDescription,
            LocaleKey.clippySecretTerminalDescription,
        ],
        isFound: (secretsFound: Array<FoundSecretType>) => secretsFound.includes(FoundSecretType.clippy),
    },
    {
        name: LocaleKey.nyanCat,
        type: FoundSecretType.nyanCat,
        howTo: [LocaleKey.nyanCatSecretDescription],
        isFound: (secretsFound: Array<FoundSecretType>) => secretsFound.includes(FoundSecretType.nyanCat),
    },
    {
        name: LocaleKey.harlemShake,
        type: FoundSecretType.harlemShake,
        howTo: [
            LocaleKey.harlemShakeSecretStartMenuDescription,
            LocaleKey.harlemShakeSecretTaskbarDescription,
            LocaleKey.harlemShakeSecretKonamiCodeDescription,
        ],
        isFound: (secretsFound: Array<FoundSecretType>) => secretsFound.includes(FoundSecretType.harlemShake),
    }
]