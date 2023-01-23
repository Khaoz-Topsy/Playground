import { Folder } from '../contracts/implementation/Folder';
import { IFolder } from '../contracts/interface/IFolder';
import { imageFile, linkFile, markDownFile, objFile, prezzFile, videoFile } from '../helper/fileHelper';
import { sortByPropDesc } from '../helper/sortHelper';
import { translate } from '../integration/i18n';
import { LocaleKey } from '../localization/LocaleKey';
import { AppletIcon, Backgrounds, ExternalImage, FileIcon, MiscIcon, Presentation } from './appImage';
import { DesktopIcons } from './desktopIconList';
import { DownloadFile } from './documentFile';
import { allVisibleApps, KnownApplets } from './knownApplets';
import { MarkdownFile } from './markdownFile';
import { site } from './site';
import { knownSlides } from './slides';

export const applicationFolderId: any = '0.0';
export const desktopFolderId: any = '0.1';
export const documentFolderId: any = '0.2';

export const getFilesOnDisk = (): IFolder => {
    const rootFolder = new Folder({ name: LocaleKey.root });

    const appFolderIndex = rootFolder.addSubFolder(new Folder({
        name: LocaleKey.applications,
        imgUrl: AppletIcon.application,
    }));
    const allKnownAppsSorted = sortByPropDesc(allVisibleApps().map(ka => ({ ...ka, translated: translate(ka.name) })), 'translated');
    for (const app of allKnownAppsSorted) {
        (rootFolder.contents[appFolderIndex] as Folder)?.addFile?.(app);
    }

    const desktopFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.desktop }));
    for (const icon of DesktopIcons) {
        (rootFolder.contents[desktopFolderIndex] as Folder)?.addFile?.(icon);
    }

    const documentFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.documents }));
    const docFolder = getFolder(rootFolder, documentFolderIndex);
    const documentFolderSecretsIndex = docFolder?.addSubFolder?.(new Folder({ name: LocaleKey.secrets }));
    const secretsDocFolder = getFolder(docFolder, documentFolderSecretsIndex);
    const documentFolderMoreSecretsIndex = secretsDocFolder?.addSubFolder?.(new Folder({ name: LocaleKey.moreSecrets }));
    const moreSecretsDocFolder = getFolder(secretsDocFolder, documentFolderMoreSecretsIndex);
    moreSecretsDocFolder.addFile(markDownFile(LocaleKey.secretFileName, MarkdownFile.secrets));

    // START Documents > Kurt
    const documentFolderKurtFolderIndex = docFolder?.addSubFolder?.(new Folder({ name: 'Kurt' as any }));
    const kurtDocsFolder = getFolder(docFolder, documentFolderKurtFolderIndex);
    kurtDocsFolder?.addFile({ ...KnownApplets.kurtLourens });
    kurtDocsFolder?.addFile(linkFile('Android CV App' as any, FileIcon.android, site.kurt.googlePlay));
    kurtDocsFolder?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.kurt.github));
    kurtDocsFolder?.addFile(linkFile('Behance' as any, FileIcon.behance, site.kurt.behance));
    // END Documents > Kurt

    const documentFolderEntelectTBFolderIndex = docFolder?.addSubFolder?.(new Folder({ name: 'Entelect Tech & Borrel' as any }));
    const entelectTBFolder = getFolder(docFolder, documentFolderEntelectTBFolderIndex);
    // entelectTBFolder?.addFile({ ...KnownApplets.powerPrezz });
    for (const prop in knownSlides.EntelectTechAndBorrel2022) {
        const value = (knownSlides.EntelectTechAndBorrel2022 as any)[prop];
        if (value != null) entelectTBFolder?.addFile(prezzFile(value));
    }
    entelectTBFolder?.addFile(imageFile('bg1.png' as any, Presentation.entelectbg1, [Presentation.entelectbg1]));
    entelectTBFolder?.addFile(imageFile('bg2.png' as any, Presentation.entelectbg2, [Presentation.entelectbg2]));
    entelectTBFolder?.addFile(videoFile('sadiolaGold.mp4' as any, Presentation.sadiolaGold));
    entelectTBFolder?.addFile(videoFile('studyingAtUJ.mp4' as any, Presentation.studyingAtUJ));
    entelectTBFolder?.addFile(videoFile('babysitGeneralManager.mp4' as any, Presentation.babysitGeneralManager));

    // getFolder(rootFolder, documentFolderIndex)?.addFile?.(markDownFile(LocaleKey.readMe, MarkdownFile.secrets));
    for (const background of Backgrounds) {
        docFolder?.addFile?.(imageFile(background.name as any, background.url, [background.url]));
    }

    const downloadsFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.downloads }));
    const downloadsFolder = getFolder(rootFolder, downloadsFolderIndex);
    downloadsFolder?.addFile(imageFile('AssistantNMS-Architecture-V2.drawio' as any, DownloadFile.AssistantNMSArchitecture, [DownloadFile.AssistantNMSArchitecture]));
    downloadsFolder?.addFile(imageFile('CommunityMissionProgressViewerSmoothing' as any, DownloadFile.communityMissionProgressViewerSmoothing, [DownloadFile.communityMissionProgressViewerSmoothing]));
    downloadsFolder?.addFile(objFile('Khaoz-Topsy-2021.stl' as any, DownloadFile.khaozTopsyGithubContribution));

    const assistantAppsFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantApps, imgUrl: AppletIcon.folderAA }));
    const assistantAppsFolder = getFolder(rootFolder, assistantAppsFolderIndex);
    assistantAppsFolder?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantAppsGeneral));
    assistantAppsFolder?.addFile(linkFile(LocaleKey.homepage, MiscIcon.assistantApps, site.assistantApps.website));
    assistantAppsFolder?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.assistantApps.github));
    assistantAppsFolder?.addFile(linkFile(LocaleKey.documentation, MiscIcon.assistantApps, site.assistantApps.docs));
    assistantAppsFolder?.addFile(linkFile('Discord' as any, FileIcon.discord, site.assistantApps.discord));
    assistantAppsFolder?.addFile(linkFile(LocaleKey.twitterFeed, AppletIcon.twitter, site.assistantApps.nms.twitter));

    const assistantNMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantNMS, imgUrl: AppletIcon.folderNMS }));
    const assistantNMSFolder = getFolder(rootFolder, assistantNMSFolderIndex);
    assistantNMSFolder?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantNMSGeneral));
    assistantNMSFolder?.addFile(linkFile(LocaleKey.androidApp, FileIcon.android, site.assistantApps.nms.googlePlay));
    assistantNMSFolder?.addFile(linkFile(LocaleKey.iOSApp, FileIcon.apple, site.assistantApps.nms.appleStore));
    assistantNMSFolder?.addFile(linkFile(LocaleKey.windowsApp, FileIcon.windows, site.assistantApps.nms.windowsStore));
    assistantNMSFolder?.addFile({ ...KnownApplets.noMansSky });
    assistantNMSFolder?.addFile(linkFile(LocaleKey.webApp, FileIcon.web, site.assistantApps.nms.webapp));
    assistantNMSFolder?.addFile(linkFile(LocaleKey.homepage, FileIcon.web, site.assistantApps.nms.website));
    assistantNMSFolder?.addFile({ ...KnownApplets.swagger, meta: { src: site.assistantApps.nms.api } });
    assistantNMSFolder?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.assistantApps.nms.github));
    // NMSCD Folder
    const assistantNMSCDFolderIndex = assistantNMSFolder.addSubFolder(new Folder({ name: 'NMSCD' as any, imgUrl: AppletIcon.folderNMSCD }));
    const assistantNMSCDFolder = getFolder(assistantNMSFolder, assistantNMSCDFolderIndex);
    assistantNMSCDFolder?.addFile(linkFile(LocaleKey.homepage, FileIcon.nmscd, site.assistantApps.nms.nmscd.website));
    assistantNMSCDFolder?.addFile(linkFile('Community Mission Progress Viewer' as any, FileIcon.communityMissionProgressViewer, site.assistantApps.nms.nmscd.communityMissionProgressViewer));
    assistantNMSCDFolder?.addFile(linkFile('Expedition Alphabet' as any, FileIcon.expeditionAlphabet, site.assistantApps.nms.nmscd.expeditionAlphabet));
    assistantNMSCDFolder?.addFile(linkFile('NMS Color Parser' as any, FileIcon.nmsColorParser, site.assistantApps.nms.nmscd.nmsColorParser));
    assistantNMSCDFolder?.addFile(linkFile('NMS Universal Font' as any, FileIcon.nmsUniversalFont, site.assistantApps.nms.nmscd.universalFont));
    assistantNMSCDFolder?.addFile(linkFile('NMS Enhanced Images' as any, FileIcon.nmsEnhancedImages, site.assistantApps.nms.nmscd.enhancedImages));
    // End Folder
    assistantNMSFolder?.addFile({ ...KnownApplets.twitterTimeline, meta: { src: site.assistantApps.nms.twitter } });
    assistantNMSFolder?.addFile(imageFile('loader.svg' as any, ExternalImage.assistantNmsLoader, [ExternalImage.assistantNmsLoader]));

    const assistantSMSFolderIndex = rootFolder.addSubFolder(new Folder({ name: LocaleKey.assistantSMS, imgUrl: AppletIcon.folderSMS }));
    const assistantSMSFolder = getFolder(rootFolder, assistantSMSFolderIndex);
    assistantSMSFolder?.addFile(markDownFile(LocaleKey.readMe, MarkdownFile.assistantSMSGeneral));
    assistantSMSFolder?.addFile(linkFile(LocaleKey.androidApp, FileIcon.android, site.assistantApps.sms.googlePlay));
    assistantSMSFolder?.addFile(linkFile(LocaleKey.iOSApp, FileIcon.apple, site.assistantApps.sms.appleStore));
    assistantSMSFolder?.addFile({ ...KnownApplets.scrapMechanic });
    assistantSMSFolder?.addFile(linkFile(LocaleKey.webApp, FileIcon.web, site.assistantApps.sms.webapp));
    assistantSMSFolder?.addFile({ ...KnownApplets.swagger, meta: { src: site.assistantApps.sms.api } });
    assistantSMSFolder?.addFile(linkFile(LocaleKey.github, FileIcon.github, site.assistantApps.sms.githubOrg));
    assistantSMSFolder?.addFile({ ...KnownApplets.vsCode, meta: { url: site.assistantApps.sms.vscodeUrlForApp } });

    return rootFolder.toIFolder();
};

const getFolder = (rootFolder: Folder, index: number): Folder => rootFolder.contents[index] as Folder;

