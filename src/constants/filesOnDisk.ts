import { FileType } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { Background, FileIcon, External } from "./appImage";
import { KnownApplets } from "./knownApplets";

export const documentFolder = {
    id: 120,
    name: 'Documents',
    contents: [
        {
            id: 121,
            name: 'ReadMe.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
        },
        {
            id: 122,
            name: 'background1.png',
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [Background.bg1]
            }
        },
        {
            id: 123,
            name: 'background2.png',
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [Background.bg2]
            }
        }
    ]
};

export const projectsFolder = {
    id: 130,
    name: 'AssistantNMS',
    contents: [
        {
            id: 131,
            name: 'loader.svg',
            imgUrl: External.assistantNmsLoader,
            type: FileType.image,
            meta: {
                images: [External.assistantNmsLoader]
            }
        }
    ]
};

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 100,
            name: 'Applications',
            contents: [
                KnownApplets.nyanCat,
                KnownApplets.settings,
                KnownApplets.terminal,
                KnownApplets.vsCode,
            ]
        },
        {
            id: 110,
            name: 'Desktop',
            contents: [
                KnownApplets.settings,
                KnownApplets.nyanCat,
                KnownApplets.terminal,
            ]
        },
        documentFolder,
        projectsFolder,
    ]
};