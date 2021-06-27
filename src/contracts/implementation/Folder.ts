import { LocaleKey } from "../../localization/LocaleKey";
import { IFile, IAppletFile, FileType } from "../interface/IFile";
import { IFolder } from "../interface/IFolder";

export interface INewSubFolderProps {
    name: LocaleKey;
    parentId?: number;
    imgUrl?: string;
}

export interface INewFolderProps extends INewSubFolderProps {
    id?: number;
}

export interface INewFileProps {
    name: LocaleKey;
    imgUrl: string;
    type: FileType;
    meta?: any;
}

export class Folder {
    id: number;
    name: LocaleKey;
    parentId: number;
    imgUrl?: string;
    contents: Array<Folder | IFile | IAppletFile>;

    constructor(props: INewFolderProps) {
        this.id = props.id ?? 0;
        this.name = props.name;
        this.parentId = props.parentId ?? props.id ?? 0;
        this.imgUrl = props.imgUrl;
        this.contents = [];
    }

    addSubFolder = (newFolder: INewSubFolderProps): number => {
        const subFolder = new Folder({
            ...newFolder,
            parentId: this.id,
            id: `${this.id}.${this.contents.length}` as any,
        });
        return this.contents.push(subFolder) - 1;
    }

    addFile = (newFile: INewFileProps) => {
        const folderFile: IFile | IAppletFile = {
            ...newFile,
            parentId: this.id,
            id: `${this.id}.${this.contents.length}` as any,
        };
        this.contents.push(folderFile);
    }

    toIFolder = (): IFolder => {
        return {
            id: this.id,
            name: this.name,
            parentId: this.parentId,
            imgUrl: this.imgUrl,
            contents: this.contents.map(c => {
                if ((c as Folder)?.toIFolder != null) {
                    return { ...(c as Folder).toIFolder() };
                }
                return { ...c };
            }),
        };
    }
}