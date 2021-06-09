import { FileType } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { Background, FileIcon } from "./appImage";
import { KnownApplets } from "./knownApplets";

export const documentFolder = {
    id: 12,
    name: 'Documents',
    contents: [
        {
            id: 201,
            name: 'ReadMe.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
        },
        {
            id: 202,
            name: 'background1.png',
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [Background.bg1]
            }
        },
        {
            id: 203,
            name: 'background2.png',
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [Background.bg2]
            }
        }
    ]
};

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 10,
            name: 'Applications',
            contents: [
                KnownApplets.nyanCat,
                KnownApplets.settings,
                KnownApplets.terminal,
                KnownApplets.vsCode,
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