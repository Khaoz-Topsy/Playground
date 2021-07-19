import { LocaleKey } from '../localization/LocaleKey';
import { FoundSecretType } from './enum/foundSecretType';

export interface ISecretFound {
    name: LocaleKey;
    type: FoundSecretType;
    howTo: Array<LocaleKey>;
    isFound: (secretsFound: Array<FoundSecretType>) => boolean;
}

const secretHasBeenFound = (secretToFind: FoundSecretType) => (secretsFound: Array<FoundSecretType>) => secretsFound.includes(secretToFind);

export const secretsFound: Array<ISecretFound> = [
    {
        name: LocaleKey.clippy,
        type: FoundSecretType.clippy,
        howTo: [
            LocaleKey.clippySecretSettingsDescription,
            LocaleKey.clippySecretTerminalDescription,
        ],
        isFound: secretHasBeenFound(FoundSecretType.clippy),
    },
    {
        name: LocaleKey.nyanCat,
        type: FoundSecretType.nyanCat,
        howTo: [LocaleKey.nyanCatSecretDescription],
        isFound: secretHasBeenFound(FoundSecretType.nyanCat),
    },
    {
        name: LocaleKey.harlemShake,
        type: FoundSecretType.harlemShake,
        howTo: [
            LocaleKey.harlemShakeSecretStartMenuDescription,
            LocaleKey.harlemShakeSecretTaskbarDescription,
            LocaleKey.harlemShakeSecretKonamiCodeDescription,
        ],
        isFound: secretHasBeenFound(FoundSecretType.harlemShake),
    },
    {
        name: LocaleKey.asciiCow,
        type: FoundSecretType.asciiCow,
        howTo: [LocaleKey.asciiCowOpenFromTerminal],
        isFound: secretHasBeenFound(FoundSecretType.asciiCow),
    },
    {
        name: LocaleKey.openDeeplyNestedSecretFile,
        type: FoundSecretType.openDeeplyNestedSecretFile,
        howTo: [LocaleKey.openDeeplyNestedSecretFileHowTo],
        isFound: secretHasBeenFound(FoundSecretType.openDeeplyNestedSecretFile),
    }
]