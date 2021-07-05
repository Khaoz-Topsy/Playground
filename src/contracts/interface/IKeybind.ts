import { FoundSecretType } from '../../constants/enum/foundSecretType';

export interface IKeyBindShortcut {
    name: string;
    keys: Array<string>;
    descrip?: string;
    requiredSecret?: FoundSecretType;
}

export interface IKeyBindSection {
    name: string,
    shortcuts: Array<IKeyBindShortcut>
}