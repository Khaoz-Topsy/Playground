import { IFolder } from "../contracts/interface/IFolder";
import { Folder } from "../contracts/implementation/Folder";
import { Backgrounds, FileIcon, External, AppletIcon } from "./appImage";
import { DataFile } from "./dataFile";
import { DesktopIcons } from "./desktopIconList";
import { allKnownApps, KnownApplets } from "./knownApplets";
import { site } from "./site";
import { imageFile, linkFile, markDownFile } from "../helper/fileHelper";
import { sortAlphabeticallyByProp } from "../helper/sortHelper";

export const documentFolderId: any = '0.2';

export const getFilesOnDisk = (): IFolder => {
    const rootFolder = new Folder({ name: 'root' });

    const appFolderIndex = rootFolder.addSubFolder(new Folder({
        name: 'Applications',
        imgUrl: AppletIcon.application,
    }));
    const allKnownAppsSorted = sortAlphabeticallyByProp(allKnownApps(), 'name');
    for (const app of allKnownAppsSorted) {
        (rootFolder.contents[appFolderIndex] as Folder)?.addFile?.(app);
    }

    const desktopFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Desktop' }));
    for (const icon of DesktopIcons) {
        (rootFolder.contents[desktopFolderIndex] as Folder)?.addFile?.(icon);
    }

    const documentFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Documents' }));
    const docFolder = getFolder(rootFolder, documentFolderIndex);
    const documentFolderSecretsIndex = docFolder?.addSubFolder?.(new Folder({ name: 'Secrets' }));
    const secretsDocFolder = getFolder(docFolder, documentFolderSecretsIndex);
    const documentFolderMoreSecretsIndex = secretsDocFolder?.addSubFolder?.(new Folder({ name: 'More Secrets' }));
    const moreSecretsDocFolder = getFolder(secretsDocFolder, documentFolderMoreSecretsIndex);
    moreSecretsDocFolder.addFile(markDownFile('Don\'t look inside 🐲.md', DataFile.secrets));

    getFolder(rootFolder, documentFolderIndex)?.addFile?.(markDownFile('ReadMe.md', DataFile.secrets));
    for (const background of Backgrounds) {
        docFolder?.addFile?.(imageFile(background.name, null, [background.url]));
    }

    // const kurtFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Kurt' }));
    // getFolder(rootFolder, kurtFolderIndex)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.nms.googlePlay));

    const assistantNMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'AssistantNMS' }));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.nms.googlePlay));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile('iOS App', FileIcon.apple, site.assistantApps.nms.appleStore));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile('WebApp', FileIcon.web, site.assistantApps.nms.webapp));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(linkFile('Homepage', FileIcon.web, site.assistantApps.nms.website));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(imageFile('loader.svg', External.assistantNmsLoader, [External.assistantNmsLoader]));
    getFolder(rootFolder, assistantNMSFolderIndex)?.addFile(markDownFile('README.md', DataFile.assistantNMSGeneral));

    const assistantSMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'AssistantSMS' }));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.sms.googlePlay));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile('iOS App', FileIcon.apple, site.assistantApps.sms.appleStore));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(linkFile('WebApp', FileIcon.web, site.assistantApps.sms.webapp));
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile({ ...KnownApplets.scrapMechanic });
    getFolder(rootFolder, assistantSMSFolderIndex)?.addFile(markDownFile('README.md', DataFile.assistantSMSGeneral));

    console.warn({ ...rootFolder.toIFolder() });
    return rootFolder.toIFolder();
};

const getFolder = (rootFolder: Folder, index: number): Folder => rootFolder.contents[index] as Folder;

