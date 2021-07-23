import { CommandEnum, ICommand } from '../customTerminal';

export const systemCmdList: { [key: string]: ICommand } = {
    clear: {
        type: CommandEnum.System,
        descrip: 'Type "clear" to clear the terminal screen.',
        aliasList: ['clear', 'cls']
    },
    help: {
        type: CommandEnum.System,
        descrip: 'Type "help" to get a supporting command list.',
        aliasList: ['help', 'ls']
    },
    exit: {
        type: CommandEnum.System,
        descrip: 'Type "exit" to return to the main page.',
        aliasList: ['exit', 'back']
    },
    pwd: {
        type: CommandEnum.System,
        descrip: 'Print name of current directory.',
        aliasList: ['pwd']
    },
    cd: {
        type: CommandEnum.System,
        descrip: 'Change current directory.',
        aliasList: ['cd']
    },
    version: {
        type: CommandEnum.System,
        descrip: 'Print version of the current project.',
        aliasList: ['version']
    }
}
