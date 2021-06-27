import { LocaleKey } from "../../localization/LocaleKey";
import { IAppletFile, IFile } from "./IFile";

export interface IFileFolderCommon {
    id: number;
    name: LocaleKey;
    parentId: number;
}

export interface IFolder extends IFileFolderCommon {
    imgUrl?: string;
    contents: Array<IFile | IAppletFile | IFolder>;
}

export const isFolder = (fileOrFolder: IFile | IFolder): fileOrFolder is IFolder => {
    return (fileOrFolder as IFolder).contents !== undefined;
}