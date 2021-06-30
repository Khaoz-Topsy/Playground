import React, { ReactNode, useEffect, useState } from 'react'

import { LoadingImage } from '../../core/loader';
import { MarkdownContent } from '../../core/markdown';
import { IApplet } from '../../../contracts/interface/IApplet'
import { NetworkState } from '../../../constants/enum/networkState';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { withServices } from '../../../integration/dependencyInjection';
import { Applet } from '../../window/applet/applet';

import { dependencyInjectionToProps, IExpectedServices } from './notesApplet.dependencyInjection';
import { visibleNotesList } from '../../../constants/markdownFile';
import { IExistingNoteMeta } from '../../../contracts/interface/IExistingNoteMeta';
import classNames from 'classnames';
import { Center } from '@chakra-ui/react';
import { translate } from '../../../integration/i18n';

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
    const [fullWindow, setFullWindow] = useState<boolean>(file != null);
    const [state, setState] = useState<IState>({
        file,
        selectedNoteIndex: props.selectedNoteIndex ?? 0,
        networkState: file ? NetworkState.Loading : NetworkState.Pending,
        content: props?.meta?.content ?? 'Failed to load content to display',
    });

    useEffect(() => {
        const newFullWindow = file != null;
        if (fullWindow !== newFullWindow) setFullWindow(newFullWindow);

        getContentFromDataService(state.selectedNoteIndex);
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
            <MarkdownContent content={localState.content} />
        </div>
        );
    }

    return (
        <Applet
            key="notesViewer"
            {...props}
            classNames="notes-viewer"
            isFullscreen={true}
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
