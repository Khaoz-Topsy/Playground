import { AppletIcon, FileIcon } from '../constants/appImage';
import { AppletType } from '../constants/enum/appletType';
import { IBreadcrumb } from '../contracts/interface/IBreadcrumb';
import { FileType, IFile } from '../contracts/interface/IFile';
import { IFolder, isFolder } from '../contracts/interface/IFolder';
import { LocaleKey } from '../localization/LocaleKey';

export const searchFilesOnDisk = (node: IFile | IFolder, id: number): IFile | IFolder | null => {
    if (id === -1) return null;

    if (node.id === id) {
        return node;
    }

    if (isFolder(node)) {
        const folder = node as IFolder;
        for (const fold of folder.contents) {
            const foldSearch = searchFilesOnDisk(fold, id);
            if (foldSearch != null) return foldSearch;
        }
    }
    return null;
}


export const fileToBreadCrumb = (node: IFile | IFolder): IBreadcrumb => ({
    id: node.id,
    isActive: false,
    name: node.name,
});

export const getBreadcrumbList = (id: number, filesOnDisk: IFolder): Array<IBreadcrumb> => {
    const crumbs: Array<IBreadcrumb> = [];
    if (id === -1) return crumbs;

    let count = 0;
    let idToLookFor = id;
    do {
        const crumbsHasRoot = crumbs.findIndex(c => c.id === 0) > -1;
        if (crumbsHasRoot) break;
        count++;

        const currentFile = searchFilesOnDisk({ ...filesOnDisk }, idToLookFor);
        if (currentFile != null) {
            idToLookFor = currentFile.parentId
            crumbs.push(fileToBreadCrumb(currentFile));
        }
    } while (count < 5);

    return crumbs.reverse();
}

export const markDownFile = (name: LocaleKey, filePath: string) => ({
    name,
    imgUrl: FileIcon.markdown,
    type: FileType.markdown,
    meta: {
        file: filePath
    }
});

export const imageFile = (name: LocaleKey, imgUrl: string | null, images: Array<string>) => ({
    name,
    imgUrl: imgUrl ?? FileIcon.picture,
    type: FileType.image,
    meta: { images }
});

export const linkFile = (name: LocaleKey, imgUrl: string, external: string, showExternalIcon = true) => ({
    name,
    imgUrl,
    type: FileType.link,
    meta: { external, showExternalIcon, }
});

export const objFile = (name: LocaleKey, objUrl: string) => ({
    name,
    imgUrl: AppletIcon.modelViewer,
    type: FileType.model,
    meta: { model: objUrl }
});

export const prezzFile = (name: LocaleKey, slides: string) => ({
    name,
    imgUrl: FileIcon.powerPrezz,
    type: FileType.powerPrezz,
    meta: {
        slides,
    }
});

export const videoFile = (name: LocaleKey, videoUrl: string, previewImgUrl: string | null = null) => ({
    name,
    imgUrl: previewImgUrl ?? FileIcon.video,
    type: FileType.video,
    meta: { videoUrl, }
});

export const iframeApplet = (name: LocaleKey, frameKey: string, src: string, imgUrl: string) => ({
    id: 30.01,
    name,
    imgUrl,
    appletType: AppletType.iframe,
    type: FileType.applet,
    meta: { key: frameKey, src, imgUrl, },
    info: { version: '0.0.1', size: 100, installedOn: new Date('2021-07-26') },
});