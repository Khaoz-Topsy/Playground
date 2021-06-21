import { IFolder } from "../contracts/interface/IFolder";
import { Folder } from "../contracts/implementation/Folder";
import { Backgrounds, FileIcon, External, AppletIcon } from "./appImage";
import { DataFile } from "./dataFile";
import { DesktopIcons } from "./desktopIconList";
import { allKnownApps, KnownApplets } from "./knownApplets";
import { site } from "./site";
import { imageFile, linkFile, markDownFile } from "../helper/fileHelper";

export const documentFolderId: any = '0.2';

export const getFilesOnDisk = (): IFolder => {
    const rootFolder = new Folder({ name: 'root' });

    const appFolderIndex = rootFolder.addSubFolder(new Folder({
        name: 'Applications',
        imgUrl: AppletIcon.application,
    }));
    for (const app of allKnownApps()) {
        (rootFolder.contents[appFolderIndex] as Folder)?.addFile?.(app);
    }

    const desktopFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Desktop' }));
    for (const icon of DesktopIcons) {
        (rootFolder.contents[desktopFolderIndex] as Folder)?.addFile?.(icon);
    }

    const documentFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'Documents' }));
    const documentFolderSecretsIndex = (rootFolder.contents[documentFolderIndex] as Folder)?.addSubFolder?.(new Folder({ name: 'Secrets' }));
    const documentFolderMoreSecretsIndex = ((rootFolder.contents[documentFolderIndex] as Folder).contents[documentFolderSecretsIndex] as Folder)?.addSubFolder?.(new Folder({ name: 'More Secrets' }));
    ((rootFolder.contents[documentFolderIndex] as Folder).contents[documentFolderMoreSecretsIndex] as Folder).addFile(markDownFile('Don\'t look inside 🐲.md', DataFile.secrets));
    (rootFolder.contents[documentFolderIndex] as Folder)?.addFile?.(markDownFile('ReadMe.md', DataFile.secrets));
    for (const background of Backgrounds) {
        (rootFolder.contents[documentFolderIndex] as Folder)?.addFile?.(imageFile(background.name, null, [background.url]));
    }

    const assistantNMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'AssistantNMS' }));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.nms.googlePlay));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(linkFile('iOS App', FileIcon.apple, site.assistantApps.nms.appleStore));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(linkFile('WebApp', FileIcon.web, site.assistantApps.nms.webapp));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(linkFile('Homepage', FileIcon.web, site.assistantApps.nms.website));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(imageFile('loader.svg', External.assistantNmsLoader, [External.assistantNmsLoader]));
    (rootFolder.contents[assistantNMSFolderIndex] as Folder)?.addFile(markDownFile('README.md', DataFile.assistantNMSGeneral));

    const assistantSMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: 'AssistantSMS' }));
    (rootFolder.contents[assistantSMSFolderIndex] as Folder)?.addFile(linkFile('Android App', FileIcon.android, site.assistantApps.sms.googlePlay));
    (rootFolder.contents[assistantSMSFolderIndex] as Folder)?.addFile(linkFile('iOS App', FileIcon.apple, site.assistantApps.sms.appleStore));
    (rootFolder.contents[assistantSMSFolderIndex] as Folder)?.addFile(linkFile('WebApp', FileIcon.web, site.assistantApps.sms.webapp));
    (rootFolder.contents[assistantSMSFolderIndex] as Folder)?.addFile({ ...KnownApplets.scrapMechanic });
    (rootFolder.contents[assistantSMSFolderIndex] as Folder)?.addFile(markDownFile('README.md', DataFile.assistantSMSGeneral));

    console.warn({ ...rootFolder.toIFolder() });
    return rootFolder.toIFolder();
};


