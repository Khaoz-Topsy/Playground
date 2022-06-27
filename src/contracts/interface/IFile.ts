import { AppletType } from "../../constants/enum/appletType";
import { IFileFolderCommon } from "./IFolder";

export enum FileType {
    applet,

    // actual files
    image,
    markdown,
    link,
    model,
}

export enum StartMenuSize {
    small,
    wide,
    tall,
    large,
}

export enum StartMenuAnimation {
    opacity,
    scale,
    slidevertical,
    slideverticalinverse,
}

export interface IFile extends IFileFolderCommon {
    imgUrl?: string;
    type: FileType;
    meta?: any;
}

export interface IAppletInfo {
    author?: string;
    projectUrl?: string;
    version: string;
    size: number;
    installedOn: Date;
    updatedOn?: Date;
}

export interface IAppletFile extends IFile {
    appletType: AppletType;
    info: IAppletInfo;
    numAllowedInstances?: number;
}

export interface IStartMenuItemProps {
    backgroundColour?: string;
    backgroundImage?: string;
    textColour?: string;
    isFull?: boolean;
    size: StartMenuSize;
    images?: Array<string>;
    secondsPerImage?: number;
    animatedTile?: StartMenuAnimation;
}

export interface IStartMenuFile extends IStartMenuItemProps, IFile { }

export interface IStartMenuAppletFile extends IStartMenuItemProps, IAppletFile { }

export const isApplet = (fileOrApplet: IFile | IAppletFile): fileOrApplet is IAppletFile => {
    return (fileOrApplet as IAppletFile).appletType !== undefined;
}
export const isLink = (fileOrApplet: IFile | IAppletFile): fileOrApplet is IFile => {
    return (fileOrApplet as IFile)?.meta?.external !== undefined;
    // return (fileOrApplet as IFile)?.meta?.external !== undefined && (fileOrApplet as IAppletFile).appletType == undefined;
}
