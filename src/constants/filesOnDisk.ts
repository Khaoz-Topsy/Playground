import { FileType } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { FileIcon } from "./appImage";
import { KnownApplets } from "./knownApplets";

export const documentFolder = {
    id: 12,
    name: 'Documents',
    contents: [{
        id: 201,
        name: 'ReadMe.md',
        imgUrl: FileIcon.markdown,
        type: FileType.markdown,
    }]
};

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 10,
            name: 'Applications',
            contents: [
                KnownApplets.settings,
                KnownApplets.terminal,
                KnownApplets.vsCode,
                KnownApplets.nyanCat,
            ]
        },
        {
            id: 11,
            name: 'Desktop',
            contents: [
                KnownApplets.settings,
                KnownApplets.nyanCat,
                KnownApplets.terminal,
            ]
        },
        documentFolder,
    ]
};