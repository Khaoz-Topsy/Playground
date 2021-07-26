import { ReactNode } from 'react';
import { LocaleKey } from '../../../localization/LocaleKey';

export enum CommandEnum {
    None,
    System,
    SystemInfo,
    SystemSuccess,
    SystemWarning,
    SystemDanger,
    Directory,
    Error,
    User
}

export interface IExecutedCommand {
    key?: string;
    type: CommandEnum;
    tag?: string;
    dir?: string;
    time?: string;
    value: string | ReactNode;
}

export interface ICommand {
    type?: CommandEnum;
    descrip: LocaleKey | string;
    aliasList?: Array<string>;
    run?: (printer: (cmd: IExecutedCommand) => void, inputCommand?: string) => Promise<void>;
}