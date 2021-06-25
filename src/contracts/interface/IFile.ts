import { AppletType } from "../../constants/enum/appletType";
import { IFileFolderCommon } from "./IFolder";

export enum FileType {
    applet,
    iframeApplet,

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

export interface IStartMenuAppletFile extends IAppletFile {
    backgroundColour?: string;
    size: StartMenuSize;
}

export enum StartMenuSize {
    small,
    wide,
    tall,
    large,
}

export const isApplet = (fileOrApplet: IFile | IAppletFile): fileOrApplet is IAppletFile => {
    return (fileOrApplet as IAppletFile).appletType !== undefined;
}
