import React, { ReactNode, useState } from 'react';
import { Center } from '@chakra-ui/react';

import { filesOnDisk } from '../../../constants/filesOnDisk';
import { AppletType } from '../../../constants/enum/appletType';
import { IApplet } from '../../../contracts/interface/IApplet';
import { FileType, IAppletFile, IFile, isApplet } from '../../../contracts/interface/IFile';
import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';
import { getBreadcrumbList, searchFilesOnDisk } from '../../../helper/fileHelper';
import { WindowStore } from '../../../state/window/store'
import { openAppFromDesktop } from '../../../state/window/reducer';

import { Window } from '../window';
import { windowIcon } from '../windowIcon';
import { ExplorerHeader } from './explorerHeader';
import { ExplorerSidebar } from './explorerSidebar';
import { ExplorerIcon } from './explorerIcon';

interface IProps extends IWindowProps {
    initialFileId?: number;
}

interface IFolderMeta extends IFolder {
    breadcrumbs: Array<IBreadcrumb>;
}

interface IState {
    currentFolder: IFolderMeta;
    previousFolders: Array<IFolderMeta>;
    nextFolders: Array<IFolderMeta>;
}

export const Explorer: React.FC<IProps> = (props: IProps) => {
    const initialFileId = props.initialFileId ?? 0;
    const file = searchFilesOnDisk(filesOnDisk, initialFileId);

    const [selectedId, setSelectedId] = useState<number>(0);
    const [folderState, setFolderState] = useState<IState>({
        currentFolder: {
            ...filesOnDisk,
            breadcrumbs: [{
                id: file?.id ?? 0,
                isActive: true,
                name: file?.name ?? 'unknown',
            }]
        },
        previousFolders: [],
        nextFolders: [],
    });

    const headerFunc = (app: IApplet): ReactNode => (
        <ExplorerHeader
            {...app}
            selectedId={selectedId}
            windowIcon={windowIcon(app.appletType)}
            breadcrumbs={currentFolder.breadcrumbs}
            hasPrev={folderState.previousFolders.length > 0}
            hasNext={folderState.nextFolders.length > 0}
            goToPrev={goToPrevious}
            goToNext={goToNext}
            openFileOrFolder={openFileOrFolder}
        />
    );

    const clickAway = (e: any) => {
        setSelectedId(-1);
    }

    const openFileOrFolder = (fileOrFolder: IFolder | IFile) => (e: any) => {
        const breadcrumbs = getBreadcrumbList(fileOrFolder.id);
        if (isFolder(fileOrFolder)) {
            const newFolder = fileOrFolder as IFolder;
            const newBreadcrumbs = [
                ...breadcrumbs,
                { id: fileOrFolder.id, isActive: true, name: newFolder.name, }
            ];
            setFolderState({
                currentFolder: {
                    ...newFolder,
                    breadcrumbs: newBreadcrumbs,
                },
                previousFolders: [...folderState.previousFolders, folderState.currentFolder],
                nextFolders: [],
            });
            return;
        }

        if (isApplet(fileOrFolder)) {
            const applet = fileOrFolder as IAppletFile;
            if (applet.appletType !== AppletType.none) {
                WindowStore.update(openAppFromDesktop(applet.appletType, applet.name, applet.meta));
            }
            return;
        } else {
            const newFile = fileOrFolder as IFile;
            let appletType: AppletType = AppletType.none;
            if (newFile.type === FileType.image) appletType = AppletType.picture;
            WindowStore.update(openAppFromDesktop(appletType, newFile.name, newFile.meta));
        }
    }

    const goToPrevious = () => {
        if (folderState.previousFolders.length < 1) return;
        const curr: IFolderMeta = { ...folderState.currentFolder };
        const prev: IFolderMeta | undefined = [...folderState.previousFolders].pop();
        if (prev == null) return;

        const newPrevs: Array<IFolderMeta> = folderState.previousFolders.slice(0, folderState.previousFolders.length - 1);
        setFolderState({
            ...folderState,
            currentFolder: prev,
            previousFolders: newPrevs,
            nextFolders: [...folderState.nextFolders, curr],
        });
    }

    const goToNext = () => {
        if (folderState.nextFolders.length < 1) return;
        const curr: IFolderMeta = { ...folderState.currentFolder };
        const next: IFolderMeta | undefined = [...folderState.nextFolders].pop();
        if (next == null) return;

        const newNext: Array<IFolderMeta> = folderState.nextFolders.slice(0, folderState.nextFolders.length - 1);
        setFolderState({
            ...folderState,
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
            sidebar={<ExplorerSidebar openFileOrFolder={openFileOrFolder} />}
        >
            {
                noItems
                    ? (
                        <Center>
                            <span>No items...</span>
                        </Center>
                    )
                    : (
                        <div className="folder-contents" onClick={clickAway}>
                            {
                                currentFolder.contents.map((content: IFile | IFolder, index: number) => {
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

