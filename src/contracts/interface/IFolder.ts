import { IFile } from "./IFile";

export interface IFolder {
    name: string;
    contents: Array<IFile | IFolder>;
}