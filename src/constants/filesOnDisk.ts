import { FileType, IAppletFile, IFile } from "../contracts/interface/IFile";
import { IFolder } from "../contracts/interface/IFolder";
import { Backgrounds, FileIcon, External, AppletIcon } from "./appImage";
import { DataFile } from "./dataFile";
import { DesktopIcons } from "./desktopIconList";
import { allKnownApps, KnownApplets } from "./knownApplets";
import { site } from "./site";

export const documentFolder: IFolder = {
    id: 3,
    parentId: 3,
    name: 'Documents',
    contents: [
        {
            id: 3.1,
            parentId: 3,
            name: 'Secrets',
            contents: [
                {
                    id: 3.11,
                    parentId: 3.1,
                    name: 'More Secrets',
                    contents: [
                        {
                            id: 3.111,
                            parentId: 3.19,
                            name: 'Don\'t look inside 🐲.md',
                            imgUrl: FileIcon.markdown,
                            type: FileType.markdown,
                            meta: {
                                file: DataFile.secrets
                            }
                        }
                    ],
                }
            ],
        },
        {
            id: 3.2,
            parentId: 3,
            name: 'ReadMe.md',
            imgUrl: FileIcon.markdown,
            type: FileType.markdown,
        },
        ...Backgrounds.map((b, index) => ({
            id: 3.1 + ((index + 1) / 100),
            parentId: 3,
            name: b.name,
            imgUrl: FileIcon.picture,
            type: FileType.image,
            meta: {
                images: [b.url]
            }
        })),
    ]
};

export const projectsFolders: Array<IFile | IAppletFile | IFolder> = [
    {
        id: 4,
        parentId: 4,
        name: 'AssistantNMS',
        contents: [
            {
                id: 4.01,
                parentId: 4,
                name: 'Android App',
                imgUrl: FileIcon.android,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.googlePlay,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.02,
                parentId: 4,
                name: 'iOS App',
                imgUrl: FileIcon.apple,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.appleStore,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.03,
                parentId: 4,
                name: 'WebApp',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.webapp,
                    showExternalIcon: true,
                }
            },
            {
                id: 4.04,
                parentId: 4,
                name: 'Homepage',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.nms.website
                }
            },
            {
                id: 4.05,
                parentId: 4,
                name: 'loader.svg',
                imgUrl: External.assistantNmsLoader,
                type: FileType.image,
                meta: {
                    images: [External.assistantNmsLoader]
                }
            },
            {
                id: 4.99,
                parentId: 4,
                name: 'README.md',
                imgUrl: FileIcon.markdown,
                type: FileType.markdown,
                meta: {
                    file: DataFile.assistantNMSGeneral
                }
            }
        ]
    },
    {
        id: 5,
        parentId: 5,
        name: 'AssistantSMS',
        contents: [
            {
                id: 5.01,
                parentId: 5,
                name: 'Android App',
                imgUrl: FileIcon.android,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.googlePlay,
                    showExternalIcon: true,
                }
            },
            {
                id: 5.02,
                parentId: 5,
                name: 'iOS App',
                imgUrl: FileIcon.apple,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.appleStore,
                    showExternalIcon: true,
                }
            },
            {
                id: 5.03,
                parentId: 5,
                name: 'WebApp',
                imgUrl: FileIcon.web,
                type: FileType.link,
                meta: {
                    external: site.assistantApps.sms.webapp,
                    showExternalIcon: true,
                }
            },
            {
                ...KnownApplets.scrapMechanic,
                id: 5.04,
                parentId: 5,
            },
            {
                id: 5.99,
                parentId: 5,
                name: 'README.md',
                imgUrl: FileIcon.markdown,
                type: FileType.markdown,
                meta: {
                    file: DataFile.assistantSMSGeneral
                }
            }
        ]
    }
];

export const filesOnDisk: IFolder = {
    id: 0,
    parentId: 0,
    name: 'root',
    contents: [
        {
            id: 1,
            parentId: 0,
            name: 'Applications',
            imgUrl: AppletIcon.application,
            contents: allKnownApps(),
        },
        {
            id: 2,
            parentId: 0,
            name: 'Desktop',
            contents: DesktopIcons
        },
        { ...documentFolder, parentId: 0 },
        ...projectsFolders.map(proj => ({ ...proj, parentId: 0 })),
    ]
};

