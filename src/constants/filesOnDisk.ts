import { FileType } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { Background, FileIcon, External, AppletIcon } from "./appImage";
import { DataFile } from "./dataFile";
import { DesktopIcons } from "./desktopIconList";
import { allKnownApps, KnownApplets } from "./knownApplets";
import { site } from "./site";

export const documentFolder = {
    id: 3,
    name: 'Documents',
    contents: [
        {
            id: 3.1,
            name: 'ReadMe.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
        },
        {
            id: 3.2,
            name: 'background1.png',
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [Background.bg1]
            }
        },
        {
            id: 3.3,
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
    id: 4,
    name: 'AssistantNMS',
    contents: [
        {
            id: 4.1,
            name: 'Android App',
            imgUrl: FileIcon.android,
            type: FileType.link,
            meta: {
                external: site.assistantApps.nms.googlePlay
            }
        },
        {
            id: 4.2,
            name: 'iOS App',
            imgUrl: FileIcon.apple,
            type: FileType.link,
            meta: {
                external: site.assistantApps.nms.appleStore
            }
        },
        {
            id: 4.3,
            name: 'WebApp',
            imgUrl: FileIcon.web,
            type: FileType.link,
            meta: {
                external: site.assistantApps.nms.webapp
            }
        },
        {
            id: 4.4,
            name: 'Homepage',
            imgUrl: FileIcon.web,
            type: FileType.link,
            meta: {
                external: site.assistantApps.nms.website
            }
        },
        {
            id: 4.5,
            name: 'loader.svg',
            imgUrl: External.assistantNmsLoader,
            type: FileType.image,
            meta: {
                images: [External.assistantNmsLoader]
            }
        },
        {
            id: 4.99,
            name: 'README.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
            meta: {
                file: DataFile.assistantNMSGeneral
            }
        }
    ]
};

export const filesOnDisk: IFolder = {
    id: 0,
    name: 'root',
    contents: [
        {
            id: 1,
            name: 'Applications',
            imgUrl: AppletIcon.application,
            contents: allKnownApps(),
        },
        {
            id: 2,
            name: 'Desktop',
            contents: DesktopIcons
        },
        documentFolder,
        projectsFolder,
    ]
};