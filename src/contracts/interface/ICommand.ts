import { ReactNode } from 'react';
import { LocaleKey } from '../../localization/LocaleKey';

export enum CommandEnum {
    None,
    System,
    SystemInfo,
    SystemSuccess,
    SystemWarning,
    SystemDanger,
    Directory,
    Error,
    User,
    Link,
    MonoSpace,
}

export interface IExecutedCommand {
    key?: string;
    type: CommandEnum;
    tag?: string;
    dir?: string;
    time?: string;
    onClick?: () => void;
    value: string | ReactNode;
}

export interface ICommand {
    sortOrder: number;
    descrip: LocaleKey | string;
    aliasList?: Array<string>;
    run?: (printer: (cmd: IExecutedCommand) => void, inputCommand?: string) => Promise<void>;
}