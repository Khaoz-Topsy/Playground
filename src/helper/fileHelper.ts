import { filesOnDisk } from "../constants/filesOnDisk";
import { IBreadcrumb } from "../contracts/interface/IBreadcrumb";
import { IFile } from "../contracts/interface/IFile";
import { IFolder, isFolder } from "../contracts/interface/IFolder";

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

export const getBreadcrumbList = (id: number): Array<IBreadcrumb> => {
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