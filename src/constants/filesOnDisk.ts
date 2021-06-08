import { FileType } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { FileIcon } from "./appImage";
import { KnownApplets } from "./knownApplets";

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 10,
            name: 'Desktop',
            contents: [
                KnownApplets.settings,
                KnownApplets.nyanCat,
                KnownApplets.terminal,
            ]
        },
        {
            id: 11,
            name: 'Documents',
            contents: [{
                id: 201,
                name: 'ReadMe.md',
                imgUrl: FileIcon.markdown,
                type: FileType.markdown,
            }]
        },
        {
            id: 12,
            name: 'Applications',
            contents: [
                KnownApplets.settings,
                KnownApplets.terminal,
                KnownApplets.nyanCat,
            ]
        }
    ]
};