import { LocaleKey } from "../../../localization/LocaleKey";

export enum CommandEnum {
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
    time?: string;
    value: string;
}

export interface ICommand {
    type?: CommandEnum;
    descrip: LocaleKey | string;
    aliasList?: Array<string>;
    run?: (printer: (cmd: IExecutedCommand) => void) => Promise<void>;
}