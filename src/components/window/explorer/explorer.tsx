import React, { ReactNode, useState } from 'react';
import { Center } from '@chakra-ui/react';

import { filesOnDisk } from '../../../constants/filesOnDisk';
import { IApplet } from '../../../contracts/interface/IApplet';
import { IFile } from '../../../contracts/interface/IFile';
import { IBreadcrumb } from '../../../contracts/interface/IBreadcrumb';
import { IFolder, isFolder } from '../../../contracts/interface/IFolder';
import { IWindowProps } from '../../../contracts/interface/IWindowProps';
import { getBreadcrumbList, searchFilesOnDisk } from '../../../helper/fileHelper';

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
    previousFolder?: IFolderMeta;
    nextFolder?: IFolderMeta;
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
    });

    const { currentFolder } = folderState;

    const headerFunc = (app: IApplet): ReactNode => (
        <ExplorerHeader
            {...app}
            selectedId={selectedId}
            windowIcon={windowIcon(app.appletType)}
            breadcrumbs={currentFolder.breadcrumbs}
            openFileOrFolder={openFileOrFolder}
        />
    );

    const clickAway = (e: any) => {
        e?.stopPropagation?.();
        setSelectedId(-1);
    }

    const openFileOrFolder = (file: IFolder | IFile) => (e: any) => {
        const breadcrumbs = getBreadcrumbList(file.id);
        if (isFolder(file)) {
            const newFolder = file as IFolder;
            const newBreadcrumbs = [
                ...breadcrumbs,
                { id: file.id, isActive: true, name: newFolder.name, }
            ];
            setFolderState({
                ...folderState,
                currentFolder: {
                    ...newFolder,
                    breadcrumbs: newBreadcrumbs,
                },
                previousFolder: folderState.currentFolder,
            });
        }
    }

    const noItems = (currentFolder.contents == null || currentFolder.contents.length < 1);

    return (
        <Window
            {...props}
            isFullscreen={true}
            classNames="explorer"
            headerFunc={headerFunc}
            sidebar={<ExplorerSidebar />}
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

