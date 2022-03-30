import React, { ReactNode, useEffect, useState } from 'react'
import { Center, useToast } from '@chakra-ui/react';
import classNames from 'classnames';

import { LoadingImage } from '../../core/loader';
import { MarkdownContent } from '../../core/markdown';
import { IApplet } from '../../../contracts/interface/IApplet'
import { endOfFileContent } from '../../../constants/jsonFile';
import { NetworkState } from '../../../constants/enum/networkState';
import { FoundSecretType } from '../../../constants/enum/foundSecretType';
import { MarkdownFile, visibleNotesList } from '../../../constants/markdownFile';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { IExistingNoteMeta } from '../../../contracts/interface/IExistingNoteMeta';
import { addSecretIfNotFound } from '../../../helper/secretFoundHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { SecretStore } from '../../../state/secrets/store';
import { Applet } from '../../window/applet/applet';

import { dependencyInjectionToProps, IExpectedServices } from './notesApplet.dependencyInjection';
import { defaultNotesHeight, defaultNotesWidth } from '../../../constants/window';
import { LocaleKey } from '../../../localization/LocaleKey';
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices {
    selectedNoteIndex?: number;
}

interface IState {
    networkState: NetworkState;
    selectedNoteIndex: number;
    file?: string;
    content: string;
}

export const NotesAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const file = props?.meta?.file;
    const currentSecretsFound = SecretStore.useState(store => store.secretsFound);
    const [fullWindow, setFullWindow] = useState<boolean>(file != null);
    const [state, setState] = useState<IState>({
        file,
        selectedNoteIndex: props.selectedNoteIndex ?? 0,
        networkState: file ? NetworkState.Loading : NetworkState.Pending,
        content: props?.meta?.content ?? 'Failed to load content to display',
    });
    const toastFunc = useToast();

    useEffect(() => {
        const newFullWindow = file != null;
        if (fullWindow !== newFullWindow) setFullWindow(newFullWindow);

        getContentFromDataService(state.selectedNoteIndex);

        if (file?.toLowerCase?.().includes(MarkdownFile.secrets?.toLowerCase?.())) {
            props.virtualAssistantService.say?.(translate(LocaleKey.clippySecretFound));
            props.virtualAssistantService.play?.(virtualAssistantAnimations.writing);
            addSecretIfNotFound({
                secretStore: SecretStore,
                currentSecretsFound,
                toastFunc,
                secretToAdd: FoundSecretType.openDeeplyNestedSecretFile,
            });
        }
        // eslint-disable-next-line
    }, [file]);

    const getContentFromDataService = async (index: number) => {
        const urlToFetch = file ?? visibleNotesList[index ?? 0].fileUrl;
        const netResult: ResultWithValue<string> = await props.dataService.getMarkdownFile<string>(urlToFetch);
        if (!netResult.isSuccess) return;

        setState({
            ...state,
            networkState: NetworkState.Success,
            content: netResult.value,
            selectedNoteIndex: index
        });
    }

    const changeSelectedNote = (index: number) => () => {
        setState({ ...state, networkState: NetworkState.Loading });
        getContentFromDataService(index);
    }
    const renderSidebar = (): ReactNode => {
        return (
            <div className="notes-sidebar noselect">
                {
                    visibleNotesList.map((note: IExistingNoteMeta, index: number) => (
                        <div
                            key={note.guid}
                            className={classNames('item', { 'selected': index === state.selectedNoteIndex })}
                            onClick={changeSelectedNote(index)}
                        >
                            <div className="item-content">
                                <div className="sender-info">
                                    <div className="first-row">
                                        <span className="from">{translate(note.name)}</span>
                                        <span className="date">{note.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }

    const renderBody = (localState: IState): ReactNode => {
        if (localState.networkState === NetworkState.Loading) return (
            <Center className="mt3">{LoadingImage(true)}</Center>
        );
        if (localState.selectedNoteIndex == null || localState.selectedNoteIndex < 0) return (
            <Center className="mt1">Error displaying note</Center>
        );

        return (<div className="content noselect p1">
            <MarkdownContent content={localState.content + endOfFileContent} />
        </div>
        );
    }

    return (
        <Applet
            key="notesViewer"
            {...props}
            classNames="notes-viewer"
            isFullscreen={true}
            defaultHeight={defaultNotesHeight}
            defaultWidth={defaultNotesWidth}
            sidebar={fullWindow === false ? renderSidebar() : undefined}
        >
            {
                (state.networkState !== NetworkState.Loading) &&
                renderBody(state)
            }
        </Applet>
    );
}

export const NotesApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    NotesAppletUnconnected,
    dependencyInjectionToProps
);
