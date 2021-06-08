import { IAppletFile, IFile } from "./IFile";

export interface IFileFolderCommon {
    id: number;
    name: string;
}

export interface IFolder extends IFileFolderCommon {
    contents: Array<IFile | IAppletFile | IFolder>;
}

export const isFolder = (fileOrFolder: IFile | IFolder): fileOrFolder is IFolder => {
    return (fileOrFolder as IFolder).contents !== undefined;
}