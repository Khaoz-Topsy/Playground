import { AppletType } from "../../constants/enum/appletType";
import { IFileFolderCommon } from "./IFolder";

export enum FileType {
    applet,

    // actual files
    image,
    markdown,
    link,
}

export interface IFile extends IFileFolderCommon {
    imgUrl: string;
    type: FileType;
    meta?: any;
}

export interface IAppletFile extends IFile {
    appletType: AppletType;
    meta?: any;
}

export const isApplet = (fileOrApplet: IFile | IAppletFile): fileOrApplet is IAppletFile => {
    return (fileOrApplet as IAppletFile).appletType !== undefined;
}
