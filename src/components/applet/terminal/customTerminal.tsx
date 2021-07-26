import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { knownKeyCodes } from '../../../constants/keybind';
import { CommandEnum, ICommand, IExecutedCommand } from './command';

export interface ITerminalProps {
    prompt: string;
    version: string;
    initialDirectory: string;
    bootCmd: string;
    commands: { [key: string]: ICommand }
}

interface IState {
    historyCmdList: Array<any>;
    historyCmdIndex: number;
    displayedMessages: Array<IExecutedCommand>;
    isPrinting: boolean;
    commandTyped: string;
}

export class Terminal extends React.Component<ITerminalProps, IState> {
    constructor(props: ITerminalProps) {
        super(props);

        this.state = {
            historyCmdList: [],
            historyCmdIndex: 0,
            displayedMessages: [],
            isPrinting: true,
            commandTyped: '',
        }
    }

    $terminal: any = React.createRef();
    $inputWrapper: any = React.createRef();
    $inputEl: any = React.createRef();

    componentDidMount() {
        if (this.props.bootCmd != null) {
            this.run(this.props.bootCmd);
        }
    }

    systemCmdList = (): { [key: string]: ICommand } => ({
        clear: {
            type: CommandEnum.System,
            descrip: 'Type "clear" to clear the terminal screen.',
            aliasList: ['clear', 'cls'],
            run: async () => {
                this.setState({ displayedMessages: [] })
            }
        },
        help: {
            type: CommandEnum.System,
            descrip: 'Type "help" to get a supporting command list.',
            aliasList: ['help'],
            run: async () => {
                const commands = this.systemCmdList();
                const commandList: Array<IExecutedCommand> = [];
                for (const cmdName in commands) {
                    if (Object.prototype.hasOwnProperty.call(commands, cmdName)) {
                        const cmd: ICommand = (commands as any)[cmdName];
                        commandList.push({ type: CommandEnum.System, tag: cmdName, value: cmd.descrip.toString() });
                    }
                }
                commandList.sort((a: IExecutedCommand, b: IExecutedCommand) => {
                    if (a.tag! < b.tag!) { return -1; }
                    if (a.tag! > b.tag!) { return 1; }
                    return 0;
                }).map(this.print);
            }
        },
        exit: {
            type: CommandEnum.System,
            descrip: 'Type "exit" to return to the main page.',
            aliasList: ['exit', 'back'],
        },
        pwd: {
            type: CommandEnum.System,
            descrip: 'Print name of current directory.',
            aliasList: ['pwd', 'ls'],
        },
        cd: {
            type: CommandEnum.System,
            descrip: 'Change current directory.',
            aliasList: ['cd'],
        },
        version: {
            type: CommandEnum.System,
            descrip: 'Print version of the current project.',
            aliasList: ['version'],
            run: async () => {
                this.print({ type: CommandEnum.System, value: this.props.version });
            }
        },
        ...this.props.commands,
    });

    getCommandFromName = (commandName: string): ICommand | undefined => {
        const commandToRun: ICommand = this.props.commands?.[commandName];
        if (commandToRun != null) return commandToRun;

        const commands = this.systemCmdList();
        for (const cmdName in commands) {
            if (Object.prototype.hasOwnProperty.call(commands, cmdName)) {
                const cmd: ICommand = (commands as any)[cmdName];
                if (cmd?.aliasList?.includes(commandName)) return cmd;
            }
        }
        return;
    }

    print = (cmd: IExecutedCommand) => {
        this.setState((prevState: IState) => ({
            displayedMessages: [...prevState.displayedMessages, {
                ...cmd,
                key: new Date().getTime().toString(),
            }]
        }));
        this.autoScroll();
    }

    inputFocus = () => this.$inputEl.current.focus();

    autoScroll = () => {
        if (this.$inputWrapper?.current?.offsetTop) {
            this.$terminal.current.scrollTop = this.$inputWrapper.current.offsetTop;
        }
    }

    run = async (commandName: string, inputCommand?: string) => {
        const runTheCommand = async () => {
            try {
                const commandToRun: ICommand | undefined = this.getCommandFromName(commandName);
                if (commandToRun == null) {
                    this.setState((prevState: IState) => ({
                        displayedMessages: [
                            ...prevState.displayedMessages,
                            this.handleError('Invalid command')
                        ],
                    }));
                    return;
                }
                await commandToRun.run?.(this.print);
                this.setState(() => ({ commandTyped: '' }));
            }
            catch (error) {
                console.error(error)
                // print(tipCmdList.error)
            }
            this.setState(() => ({ isPrinting: false }));
        }

        this.setState(() => ({ isPrinting: true }), runTheCommand);
    }

    handleError = (message: string): IExecutedCommand => {
        return {
            key: new Date().toISOString(),
            type: CommandEnum.Error,
            value: message,
        };
    }

    onInputKeyDown = async (e: any) => {
        e.persist();
        if (e?.keyCode === knownKeyCodes.enter) {
            const typed = e?.target?.value ?? '';
            this.setState((prevState: IState) => ({
                commandTyped: '',
                displayedMessages: [
                    ...prevState.displayedMessages,
                    {
                        key: new Date().toISOString(),
                        type: CommandEnum.User,
                        value: typed,
                    }
                ],
            }));

            let commandName = typed.split(' ')?.[0];
            if (commandName == null) {
                this.setState((prevState: IState) => ({
                    displayedMessages: [
                        ...prevState.displayedMessages,
                        this.handleError('Invalid command name')
                    ],
                }));
                return;
            }

            await this.run(commandName, '');
            return;
        }
    }

    onInputTextChange = (e: any) => {
        const typed = e?.target?.value ?? '';
        this.setState(() => ({ commandTyped: typed }));
    }

    renderMessages = (msg: IExecutedCommand): ReactNode => {
        if (msg.type === CommandEnum.User) {
            return (
                <React.Fragment key={msg.key}>
                    <span>{this.props.prompt}</span>
                    <span>{msg.value}</span>
                    <br />
                </React.Fragment>
            );
        }
        if (
            msg.type === CommandEnum.System ||
            msg.type === CommandEnum.SystemInfo ||
            msg.type === CommandEnum.SystemSuccess ||
            msg.type === CommandEnum.SystemWarning ||
            msg.type === CommandEnum.SystemDanger
        ) {
            return (
                <React.Fragment key={msg.key}>
                    <span className={classNames('background', CommandEnum[msg.type], msg.tag ?? 'System')}>
                        {msg.tag ?? 'System'}
                    </span>
                    <span>{msg.value}</span>
                    <br />
                </React.Fragment>
            );
        }
        return (
            <React.Fragment key={msg.key}>
                <span>{msg.value}</span>
                <br />
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="custom-terminal" ref={this.$terminal} onClick={this.inputFocus}>
                {this.state.displayedMessages.map(this.renderMessages)}
                <span>{this.props.prompt}</span>
                <input ref={this.$inputEl} autoFocus
                    value={this.state.commandTyped}
                    onChange={this.onInputTextChange}
                    onKeyDown={this.onInputKeyDown}
                />
            </div>
        );
    }
}