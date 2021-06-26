const imgFolder = '/assets/img/';
const vidFolder = '/assets/vid/';

export const error = imgFolder + 'appIcons/error.png';

export class AppletIcon {
    static kurt = imgFolder + 'appIcons/kurt.png';
    static windows = imgFolder + 'appIcons/windows.png';
    static assistantNMS = imgFolder + 'appIcons/assistantNMS.png';
    static assistantSMS = imgFolder + 'appIcons/assistantSMS.png';
    static settings = imgFolder + 'appIcons/setting2.png';
    static nyanCat = imgFolder + 'appIcons/nyanCat.png';
    static terminal = imgFolder + 'appIcons/terminal.png';
    static folder = imgFolder + 'appIcons/folder.png';
    static application = imgFolder + 'appIcons/application.png';
    static vsCode = imgFolder + 'appIcons/vsCode.png';
    static music = imgFolder + 'appIcons/music.png';
}

export class FileIcon {
    static markdown = imgFolder + 'fileIcons/markdown2.png';
    static picture = imgFolder + 'fileIcons/picture.png';
    static android = imgFolder + 'fileIcons/android.png';
    static apple = imgFolder + 'fileIcons/apple2.png';
    static web = imgFolder + 'fileIcons/web.png';

    static miniLink = imgFolder + 'fileIcons/externalIcon.png';
}

export class MiscIcon {
    static streamPreview = vidFolder + 'streamPreview.min.gif';
}

export const Backgrounds = [
    {
        value: 'bg1',
        name: 'background1.png',
        url: imgFolder + 'spaceBluePurple.jpg',
    },
    {
        value: 'bg2',
        name: 'background2.png',
        url: imgFolder + 'deepSpace.jpg',
    }
];

export class External {
    static githubGeneralStats = 'https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24';
    static githubLanguageStats = 'https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy';
    static assistantNmsLoader = 'https://raw.githubusercontent.com/AssistantNMS/nms-loader/main/loader.svg';
}

export const imagesToPrecache = [
    AppletIcon.kurt,
    AppletIcon.windows,
    AppletIcon.assistantNMS,
    AppletIcon.assistantSMS,
    AppletIcon.settings,
    AppletIcon.nyanCat,
    AppletIcon.folder,
    //Files
    FileIcon.markdown,
    // External
    External.githubGeneralStats,
    External.githubLanguageStats,
    External.assistantNmsLoader,
    // Status
    error,
];