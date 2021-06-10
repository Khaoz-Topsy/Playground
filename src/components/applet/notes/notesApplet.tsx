import React, { useEffect, useState } from 'react'

import { MarkdownContent } from '../../core/markdown';
import { IApplet } from '../../../contracts/interface/IApplet'
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { withServices } from '../../../integration/dependencyInjection';
import { Applet } from '../../window/applet/applet';

import { dependencyInjectionToProps, IExpectedServices } from './notesApplet.dependencyInjection';

interface IWithoutExpectedServices { };
interface IProps extends IApplet, IExpectedServices, IWithoutExpectedServices {
    meta?: any;
}

interface IState {
    isLoading: boolean;
    content: string;
}

export const NotesAppletUnconnected: React.FC<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({
        isLoading: true,
        content: props?.meta?.content ?? 'Failed to load content to display',
    });

    const file = props?.meta?.file;
    useEffect(() => {
        if (file == null) {
            setState({ ...state, isLoading: false });
            return;
        }

        getContentFromDataService(file);
        // eslint-disable-next-line
    }, [file]);

    const getContentFromDataService = async (file: string) => {
        const netResult: ResultWithValue<string> = await props.dataService.getJsonFile<string>(file);
        if (!netResult.isSuccess) return;

        setState({ isLoading: false, content: netResult.value });
    }

    return (
        <Applet
            key="notesViewer"
            {...props}
            classNames="notes-viewer"
            isFullscreen={true}
            showLoading={state.isLoading}
        >
            {
                (state.isLoading === false) &&
                <MarkdownContent content={state.content} />
            }
        </Applet>
    );
}

export const NotesApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    NotesAppletUnconnected,
    dependencyInjectionToProps
);
