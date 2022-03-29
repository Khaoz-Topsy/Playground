import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { knownKeyCodes } from '../../../constants/keybind';
import { TerminalLoadingImage } from '../../core/loader';
import { IAppletFile, IFile, isApplet } from '../../../contracts/interface/IFile';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { getDateMilli } from '../../../helper/dateHelper';
import { searchFilesOnDisk } from '../../../helper/fileHelper';
import { getFunnyMessages } from '../../../helper/funnyLoadingMessagesHelper';
import { wait } from '../../../helper/timeoutHelper';
import { translate } from '../../../integration/i18n';
import { warn } from '../../../integration/logging';

import { CommandEnum, ICommand, IExecutedCommand } from '../../../contracts/interface/ICommand';

const appletSuffix = '.applet';

export interface ITerminalProps {
    user?: string;
    prompt: string;
    version: string;
    folderStructure: IFolder;
    bootCmd?: string;
    commands: { [key: string]: ICommand }
}

interface IState {
    historyCmdList: Array<any>;
    historyCmdIndex: number;
    tabList: Array<string>;
    tabIndex: number;
    currentFolder: IFolder;
    displayedMessages: Array<IExecutedCommand>;
    isPrinting: boolean;
    commandTyped: string;
    preTabCommandTyped?: string;
}

export class Terminal extends React.Component<ITerminalProps, IState> {
    constructor(props: ITerminalProps) {
        super(props);

        this.state = {
            historyCmdList: [],
            historyCmdIndex: 0,
            tabList: this.getTabList(props.folderStructure),
            tabIndex: -1,
            currentFolder: { ...props.folderStructure },
            displayedMessages: [],
            isPrinting: true,
            commandTyped: '',
        }
    }

    $terminal: any = React.createRef();
    $inputWrapper: any = React.createRef();
    $inputEl: any = React.createRef();

    componentDidMount() {
        this.run(this.props.bootCmd ?? 'intro');
    }

    systemCmdList = (): { [key: string]: ICommand } => ({
        intro: {
            sortOrder: 10,
            descrip: 'Terminal loading process' as any,
            run: async () => {
                this.print({
                    type: CommandEnum.None,
                    value: 'Welcome to Kurt\'s Terminal',
                });
                await wait(500);

                for (const intro of getFunnyMessages(3)) {
                    this.print({
                        type: CommandEnum.SystemInfo,
                        tag: 'Loading',
                        value: intro,
                    });
                    await wait(500);
                }

                this.print({
                    type: CommandEnum.SystemSuccess,
                    tag: 'Success',
                    value: 'Successfully loaded!',
                });
            }
        },
        clear: {
            sortOrder: 90,
            descrip: 'Type "clear" to clear the terminal screen.',
            aliasList: ['cls'],
            run: async () => this.setState({ displayedMessages: [] }),
        },
        help: {
            sortOrder: 89,
            descrip: 'Type "help" to get a supporting command list.',
            run: async () => {
                const commands = this.systemCmdList();
                const commandList: Array<ICommand> = [];
                for (const cmdName in commands) {
                    if (Object.prototype.hasOwnProperty.call(commands, cmdName)) {
                        const cmd: ICommand = (commands as any)[cmdName];
                        commandList.push({ ...cmd, tag: cmdName } as any);
                    }
                }
                const orderedList = commandList.sort((a: ICommand, b: ICommand) => {
                    if (a.sortOrder < b.sortOrder) { return -1; }
                    if (a.sortOrder > b.sortOrder) { return 1; }
                    return 0;
                }).map((c: any) => ({ type: CommandEnum.System, tag: c.tag, value: c.descrip.toString() }));
                for (const orderedItem of orderedList) {
                    this.print(orderedItem);
                }
            }
        },
        exit: {
            sortOrder: 99,
            descrip: 'Type "exit" to closse the terminal.',
            aliasList: ['back'],
        },
        ls: {
            sortOrder: 16,
            descrip: 'Print name of current directory.',
            aliasList: ['pwd'],
            run: async () => {
                this.setState((prevState: IState) => ({
                    displayedMessages: [
                        ...prevState.displayedMessages,
                        ...prevState.currentFolder.contents.map((f: IAppletFile | IFile | IFolder, index: number) => (
                            {
                                key: getDateMilli((prevState.displayedMessages.length + index + 1).toString()),
                                type: CommandEnum.Directory,
                                dir: translate(this.state.currentFolder.name),
                                value: this.getFolderOrFileName(f),
                            })),
                    ]
                }), () => this.autoScroll());
            }
        },
        cd: {
            sortOrder: 15,
            descrip: 'Change current directory.',
            run: async (printer: any, secondParam?: string) => {
                if (secondParam == null || secondParam.length < 1) {
                    this.print(this.handleError('Invalid command arguments'));
                    return;
                }
                this.setState((prevState: IState) => {
                    let newContent: any = (prevState.currentFolder.contents ?? [])
                        .find((f: IAppletFile | IFile | IFolder) => translate(f.name).toLowerCase() === secondParam.toLowerCase()) as IFolder;

                    if (secondParam.includes('..')) {
                        const parentId = this.state.currentFolder.parentId;
                        if (parentId === 0) {
                            return {
                                ...prevState,
                                displayedMessages: [
                                    ...prevState.displayedMessages, {
                                        ...this.handleError('Cannot navigate up any further'),
                                        key: getDateMilli((prevState.displayedMessages.length + 1).toString()),
                                    }
                                ]
                            };
                        }
                        const parentFolder = searchFilesOnDisk(this.props.folderStructure, parentId);
                        newContent = { ...parentFolder };
                    }
                    if (newContent == null) return {
                        ...prevState,
                        displayedMessages: [
                            ...prevState.displayedMessages, {
                                ...this.handleError('Cannot find specified folder'),
                                key: getDateMilli((prevState.displayedMessages.length + 1).toString()),
                            },
                        ]
                    };

                    return {
                        tabList: this.getTabList(newContent),
                        tabIndex: -1,
                        currentFolder: newContent
                    }
                });
            }
        },
        version: {
            sortOrder: 88,
            descrip: 'Print version of the current project.',
            run: async () => {
                this.print({ type: CommandEnum.System, value: this.props.version });
            }
        },
        ...this.props.commands,
    });

    getFolderOrFileName = (fileOrFolder: IFolder | IFile | IAppletFile): string | ReactNode => {
        const fileName = translate(fileOrFolder.name).includes(' ')
            ? `"${translate(fileOrFolder.name)}"`
            : translate(fileOrFolder.name);
        if (isApplet(fileOrFolder as IAppletFile)) {
            return fileName.includes('"')
                ? (fileName.substring(0, fileName.length - 1) + appletSuffix + `"`)
                : fileName + appletSuffix;
        }
        return fileName;
    }

    getTabList = (fileOrFolder: IFolder | IFile | IAppletFile): Array<string> => {
        if (isFolder(fileOrFolder)) {
            return fileOrFolder.contents.map(c => translate(c.name));
        }
        if (isApplet(fileOrFolder)) {
            return [translate(fileOrFolder.name) + appletSuffix];
        }
        return [translate(fileOrFolder.name)];
    }

    getCommandFromName = (commandName: string): ICommand | undefined => {
        const commandToRun: ICommand = this.props.commands?.[commandName];
        if (commandToRun != null) return commandToRun;

        const commands = this.systemCmdList();
        for (const cmdName in commands) {
            if (Object.prototype.hasOwnProperty.call(commands, cmdName)) {
                const cmd: ICommand = (commands as any)[cmdName];
                if (cmd?.aliasList?.includes(commandName)) return cmd;
                if (cmd != null && cmdName === commandName) return cmd;
            }
        }
        return;
    }

    print = (cmd: IExecutedCommand) => {
        this.setState((prevState: IState) => ({
            displayedMessages: [...prevState.displayedMessages, {
                ...cmd,
                key: getDateMilli((prevState.displayedMessages.length + 1).toString()),
            }]
        }), () => this.autoScroll());
    }

    inputFocus = () => this.$inputEl?.current?.focus?.();

    autoScroll = () => {
        if (this.$inputWrapper?.current?.offsetTop) {
            this.$terminal.current.scrollTop = this.$inputWrapper.current.offsetTop;
        }
    }

    run = async (commandName: string, inputCommand?: string) => {
        const runTheCommand = (resolve: (value?: any) => void) => async () => {
            try {
                const commandToRun: ICommand | undefined = this.getCommandFromName(commandName);
                if (commandToRun != null) {
                    await commandToRun.run?.(this.print, inputCommand);
                    this.setState(() => ({ commandTyped: '', preTabCommandTyped: '' }));
                } else {
                    let newContent: any = (this.state.currentFolder.contents ?? [])
                        .find((f: IAppletFile | IFile | IFolder) => translate(f.name).toLowerCase() === (commandName + ' ' + inputCommand ?? '').trim().toLowerCase()) as IFolder;
                    if (newContent) {
                        this.print(this.handleError('Not implemented yet...'));
                    }
                    else {
                        this.setState((prevState: IState) => ({
                            isPrinting: false,
                            displayedMessages: [
                                ...prevState.displayedMessages,
                                this.handleError('Invalid command'),
                            ],
                        }));
                    }
                }
            }
            catch (ex) {
                warn(ex);
                // print(tipCmdList.error)
            }
            this.setState(() => ({ isPrinting: false }), () => resolve());
        }

        return new Promise(resolve => {
            this.setState(() => ({ isPrinting: true }), runTheCommand(resolve));
        });
    }

    handleError = (message: string): IExecutedCommand => {
        return {
            key: getDateMilli('error'),
            type: CommandEnum.Error,
            value: message,
        };
    }

    onInputKeyDown = async (e: any) => {
        e?.persist?.();
        let charCode = String.fromCharCode(e.which).toLowerCase();
        if (e.ctrlKey && charCode === 'c') {
            this.run('exit');
            return;
        }

        if (e?.keyCode === knownKeyCodes.enter) {
            const typed = e?.target?.value ?? '';
            this.setState((prevState: IState) => ({
                commandTyped: '',
                preTabCommandTyped: '',
                displayedMessages: [
                    ...prevState.displayedMessages,
                    {
                        key: getDateMilli((prevState.displayedMessages.length + 1).toString()),
                        type: CommandEnum.User,
                        dir: translate(this.state.currentFolder.name),
                        value: typed,
                    }
                ],
            }));

            let commandName = typed.split(' ')?.[0];
            if (commandName == null) {
                this.setState((prevState: IState) => ({
                    isPrinting: false,
                    displayedMessages: [
                        ...prevState.displayedMessages,
                        this.handleError('Invalid command name')
                    ],
                }));
                return;
            }

            await this.run(commandName, typed.replace(commandName, '').trim());
            return;
        } else if (e?.keyCode === knownKeyCodes.tab) {
            e?.preventDefault?.();
            this.setState((prevState: IState) => {
                let tabIndex = prevState.tabIndex;
                if (tabIndex >= (prevState.tabList.length - 1)) tabIndex = -1;

                const tabSuggestion = prevState.tabList?.[tabIndex + 1];
                if (tabSuggestion == null) return { ...prevState };

                return {
                    tabIndex: tabIndex + 1,
                    commandTyped: (prevState.preTabCommandTyped ?? '') + ' ' + tabSuggestion,
                }
            });
        }
    }

    onInputTextChange = (e: any) => {
        const typed = e?.target?.value ?? '';
        let commandName = typed.split(' ')?.[0];
        this.setState(() => ({ commandTyped: typed, preTabCommandTyped: commandName }));
    }

    renderDirectory = (dir: string, msgIndex: number) => {
        return (
            <div className="msg">
                {msgIndex > 0 && <br />}
                <span>
                    <span className="user">{this.props.user ?? 'root'}: </span>
                    <span className="dir">{dir}</span>
                </span>
                <br />
            </div>
        );
    }

    renderMessages = (msg: IExecutedCommand, msgIndex: number): ReactNode => {
        if (msg.type === CommandEnum.User) {
            return (
                <React.Fragment key={msg.key}>
                    {msg.dir && this.renderDirectory(msg.dir, msgIndex)}
                    <div className="msg">
                        <span>{this.props.prompt}</span>
                        <span>{msg.value}</span>
                        <br />
                    </div>
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
                <div key={msg.key} className="msg animate">
                    <span className={classNames('tag', CommandEnum[msg.type], msg.tag ?? 'System')}>
                        {msg.tag ?? 'System'}
                    </span>
                    <span>{msg.value}</span>
                    <br />
                </div>
            );
        }
        if (msg.type === CommandEnum.Error) {
            return (
                <div key={msg.key} className="msg animate">
                    <span className="error">{msg.value}</span>
                    <br />
                </div>
            );
        }
        if (msg.type === CommandEnum.Link) {
            return (
                <div key={msg.key} className="msg animate" onClick={msg.onClick}>
                    <span className={classNames('tag', CommandEnum[msg.type], msg.tag ?? 'System')}>
                        {msg.tag ?? 'System'}
                    </span>
                    <span className="Link">{msg.value}</span>
                    {msg.onClick !== null && <span className="Link"><ExternalLinkIcon ml="1" color="blue.400" /></span>}
                    <br />
                </div>
            );
        }
        return (
            <div key={msg.key} className={classNames('msg', CommandEnum[msg.type])}>
                <span>{msg.value}</span>
                <br />
            </div>
        );
    }

    render() {
        return (
            <div className="custom-terminal" ref={this.$terminal} onClick={this.inputFocus}>
                {this.state.displayedMessages.map(this.renderMessages)}
                {
                    (this.state.isPrinting)
                        ? <TerminalLoadingImage />
                        : <>
                            {this.state.currentFolder && this.renderDirectory(translate(this.state.currentFolder.name), this.state.displayedMessages.length)}
                            <div className="input">
                                <span>{this.props.prompt}</span>
                                <input ref={this.$inputEl}
                                    autoFocus={true}
                                    spellCheck="false"
                                    autoComplete="off"
                                    value={this.state.commandTyped}
                                    onChange={this.onInputTextChange}
                                    onKeyDown={this.onInputKeyDown}
                                />
                            </div>
                        </>
                }
            </div>
        );
    }
}