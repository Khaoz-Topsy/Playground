const imgFolder = '/assets/img/';

export class AppletIcon {
    static kurt = imgFolder + 'appIcons/kurt.png';
    static windows = imgFolder + 'appIcons/windows.svg';
    static assistantNMS = imgFolder + 'appIcons/assistantNMS.png';
    static assistantSMS = imgFolder + 'appIcons/assistantSMS.png';
    static settings = imgFolder + 'appIcons/setting.png';
    static nyanCat = imgFolder + 'appIcons/nyanCat.png';
    static terminal = imgFolder + 'appIcons/terminal.png';
    static folder = imgFolder + 'appIcons/folder.png';
    static error = imgFolder + 'appIcons/error.png';
}

export class FileIcon {
    static markdown = imgFolder + 'fileIcons/markdown2.png';
}

export class Background {
    static bg1 = imgFolder + 'spaceBluePurple.jpg';
    static bg2 = imgFolder + 'deepSpace.jpg';
}

export const imagesToPrecache = [
    AppletIcon.kurt,
    AppletIcon.windows,
    AppletIcon.assistantNMS,
    AppletIcon.assistantSMS,
    AppletIcon.settings,
    AppletIcon.nyanCat,
    AppletIcon.folder,
    AppletIcon.error,
    //Files
    FileIcon.markdown,
    // Backgrounds
    Background.bg1,
    Background.bg2,
];