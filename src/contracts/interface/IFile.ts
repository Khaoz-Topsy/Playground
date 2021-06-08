import { AppletType } from "../../constants/enum/appletType";
import { IFileFolderCommon } from "./IFolder";

export enum FileType {
    applet,

    // actual files
    markdown,
}

export interface IFile extends IFileFolderCommon {
    imgUrl: string;
    type: FileType;
}

export interface IAppletFile extends IFile {
    appletType: AppletType;
}
