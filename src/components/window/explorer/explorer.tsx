import React, { ReactNode, useState } from 'react';
import { Center } from '@chakra-ui/react';

import { explorerSelect } from '../../../constants/enum/customWindowEvent';
import { IApplet } from '../../../contracts/interface/IApplet';
import { IAppletFile, IFile } from '../../../contracts/interface/IFile';
import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';
import { openAppletOrFile } from '../../../helper/appletHelper';
import { disabledContext } from '../../../helper/clickHelper';
import { getBreadcrumbList, searchFilesOnDisk } from '../../../helper/fileHelper';
import { withServices } from '../../../integration/dependencyInjection';
import { WindowStore } from '../../../state/window/store';

import { Window } from '../window';
import { windowIcon } from '../windowIcon';
import { ExplorerHeader } from './explorerHeader';
import { ExplorerSidebar } from './explorerSidebar';
import { ExplorerIcon } from './explorerIcon';
import { dependencyInjectionToProps, IExpectedServices } from './explorer.dependencyInjection';
import { defaultExplorerHeight, defaultExplorerWidth } from '../../../constants/window';

interface IWithoutExpectedServices {
    initialFileId?: number;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices, IWindowProps { }

interface IFolderMeta extends IFolder {
    breadcrumbs: Array<IBreadcrumb>;
}

interface IState {
    currentChangeIndex: number;
    currentFolder: IFolderMeta;
    previousFolders: Array<IFolderMeta>;
    nextFolders: Array<IFolderMeta>;
}

export const ExplorerUnconnected: React.FC<IProps> = (props: IProps) => {
    const initialFileId = props.meta.initialFileId ?? props.initialFileId ?? 0;
    const file = searchFilesOnDisk(props.folderStructure, initialFileId);

    const [selectedId, setSelectedId] = useState<number>(file?.id ?? 0);
    const [folderState, setFolderState] = useState<IState>({
        currentChangeIndex: 0,
        currentFolder: {
            ...(isFolder(file!) ? file : props.folderStructure),
            breadcrumbs: getBreadcrumbList(file?.id ?? 0, props.folderStructure),
        },
        previousFolders: [],
        nextFolders: [],
    });

    const headerFunc = (app: IApplet): ReactNode => (
        <ExplorerHeader
            {...app}
            selectedId={selectedId}
            currentChangeIndex={folderState.currentChangeIndex}
            windowIcon={windowIcon(app.appletType)}
            breadcrumbs={currentFolder.breadcrumbs}
            hasPrev={folderState.previousFolders.length > 0}
            hasNext={folderState.nextFolders.length > 0}
            goToPrev={() => goToPrevious()}
            goToNext={() => goToNext()}
            openFileOrFolder={openFileOrFolder}
        />
    );

    const clickAway = (e: any) => {
        if (e?.customEvent === explorerSelect) return;
        setSelectedId(-1);
    }

    const openFileOrFolder = (fileOrFolder: IAppletFile | IFile | IFolder) => (e: any) => {
        const breadcrumbs = getBreadcrumbList(fileOrFolder.id, props.folderStructure);
        if (isFolder(fileOrFolder)) {
            const newFolder = fileOrFolder as IFolder;
            const newFolderState = {
                currentChangeIndex: folderState.currentChangeIndex + 1,
                currentFolder: {
                    ...newFolder,
                    breadcrumbs: breadcrumbs,
                },
                previousFolders: [...folderState.previousFolders, folderState.currentFolder],
                nextFolders: [],
            };
            setFolderState(newFolderState);
            return;
        }

        openAppletOrFile(WindowStore, fileOrFolder);
    }

    const goToPrevious = () => {
        if (folderState.previousFolders.length < 1) return;
        const curr: IFolderMeta = { ...folderState.currentFolder };
        const prev: IFolderMeta | undefined = [...folderState.previousFolders].pop();
        if (prev == null) return;

        const newPrevs: Array<IFolderMeta> = folderState.previousFolders.slice(0, folderState.previousFolders.length - 1);
        const newFolderState = {
            ...folderState,
            currentChangeIndex: folderState.currentChangeIndex + 1,
            currentFolder: prev,
            previousFolders: newPrevs,
            nextFolders: [...folderState.nextFolders, curr],
        };
        setFolderState(newFolderState);
    }

    const goToNext = () => {
        if (folderState.nextFolders.length < 1) return;
        const curr: IFolderMeta = { ...folderState.currentFolder };
        const next: IFolderMeta | undefined = [...folderState.nextFolders].pop();
        if (next == null) return;

        const newNext: Array<IFolderMeta> = folderState.nextFolders.slice(0, folderState.nextFolders.length - 1);
        setFolderState({
            ...folderState,
            currentChangeIndex: folderState.currentChangeIndex + 1,
            currentFolder: next,
            previousFolders: [...folderState.previousFolders, curr],
            nextFolders: newNext,
        });
    }

    const { currentFolder } = folderState;
    const noItems = (currentFolder.contents == null || currentFolder.contents.length < 1);

    return (
        <Window
            {...props}
            isFullscreen={true}
            classNames="explorer"
            headerFunc={headerFunc}
            defaultWidth={defaultExplorerWidth}
            defaultHeight={defaultExplorerHeight}
            sidebar={
                <ExplorerSidebar
                    currentFolder={currentFolder}
                    openFileOrFolder={openFileOrFolder}
                />
            }
        >
            {
                noItems
                    ? (
                        <Center >
                            <p className="mt3">No items...</p>
                        </Center>
                    )
                    : (
                        <div className="folder-contents" onClick={clickAway} onContextMenu={disabledContext}>
                            {
                                currentFolder.contents.map((content: IAppletFile | IFile | IFolder, index: number) => {
                                    return (
                                        <ExplorerIcon
                                            key={`${index}-${content.id}`}
                                            index={index}
                                            iconData={content}
                                            isSelected={content.id === selectedId}
                                            openFileOrFolder={openFileOrFolder}
                                            setSelected={setSelectedId}
                                        />
                                    );
                                })
                            }
                        </div>
                    )
            }
        </Window>
    );
}


export const Explorer = withServices<IWithoutExpectedServices, IExpectedServices>(
    ExplorerUnconnected,
    dependencyInjectionToProps
);
