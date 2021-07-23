import React from 'react';
import { knownKeyCodes } from '../../../constants/keybind';

import { LocaleKey } from '../../../localization/LocaleKey';

interface IExecutedCommand {
    key: string;
    type: CommandEnum;
    tag?: string;
    time?: string;
    value: string;
}

export enum CommandEnum {
    System,
    Error,
    User
}

export interface ICommand {
    type?: CommandEnum;
    descrip: LocaleKey | string;
    aliasList?: Array<string>;
    run?: (printer: (text: string) => void) => Promise<void>;
}

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

    print = (text: string) => {
        this.setState((prevState: IState) => ({
            displayedMessages: [...prevState.displayedMessages, {
                key: new Date().toISOString(),
                type: CommandEnum.User,
                value: text,
            }]
        }));
        this.autoScroll();
    }

    inputFocus = () => this.$inputEl.current.focus();

    autoScroll = () => {
        this.$terminal.current.scrollTop = this.$inputWrapper.current.offsetTop;
    }

    run = async (commandName: string, inputCommand: string) => {
        const runTheCommand = async () => {
            try {
                const commandToRun: ICommand = this.props.commands?.[commandName];
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

    getDisplayMessage = (typed: string, commandType?: CommandEnum): IExecutedCommand => {
        return {
            key: new Date().toISOString(),
            type: commandType ?? CommandEnum.User,
            value: typed,
        }
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
                    this.getDisplayMessage(typed, CommandEnum.User)
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

    render() {
        return (
            <div className="custom-terminal" ref={this.$terminal} onClick={this.inputFocus}>
                {
                    this.state.displayedMessages.map((msg: IExecutedCommand) => {
                        if (msg.type === CommandEnum.User) {
                            return (
                                <React.Fragment key={msg.key}>
                                    <span>{this.props.prompt}</span>
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
                    })
                }
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