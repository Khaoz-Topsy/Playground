const imgFolder = '/assets/img/';
const vidFolder = '/assets/vid/';
const backgroundsFolder = '/assets/img/backgrounds/';

export const error = imgFolder + 'appIcons/error.png';

export class AppletIcon {
    static kurt = imgFolder + 'appIcons/kurt.png';
    static blog = imgFolder + 'appIcons/blog.png';
    static music = imgFolder + 'appIcons/music.png';
    static email = imgFolder + 'appIcons/email.png';
    static liveTv = imgFolder + 'appIcons/live.png';
    static radio = imgFolder + 'appIcons/tuneIn.svg';
    static folder = imgFolder + 'appIcons/folder.png';
    static vsCode = imgFolder + 'appIcons/vsCode.png';
    static monitor = imgFolder + 'appIcons/monitor.png';
    static nyanCat = imgFolder + 'appIcons/nyanCat.png';
    static windows = imgFolder + 'appIcons/menu-dots.svg';
    static internet = imgFolder + 'appIcons/internet3.png';
    static minecraft = imgFolder + 'appIcons/minecraft.png';
    static settings = imgFolder + 'appIcons/setting3.png';
    static terminal = imgFolder + 'appIcons/terminal.png';
    static yellowPages = imgFolder + 'appIcons/yellowPages.png';
    static modelViewer = imgFolder + 'appIcons/modelViewer.png';
    static assistantNMS = imgFolder + 'appIcons/assistantNMS.png';
    static assistantSMS = imgFolder + 'appIcons/assistantSMS.png';
    static presentation = imgFolder + 'appIcons/presentation.png';
    static application = imgFolder + 'appIcons/application.png';
    static twitter = imgFolder + 'appIcons/twitter.png';
    static diablo = imgFolder + 'appIcons/diablo.png';
    static digdug = imgFolder + 'appIcons/digdug.png';
    static folderAA = imgFolder + 'appIcons/folderAA.png';
    static folderNMS = imgFolder + 'appIcons/folderNMS.png';
    static folderSMS = imgFolder + 'appIcons/folderSMS.png';
    static folderNMSCD = imgFolder + 'appIcons/folderNMSCD.png';
    static paint = imgFolder + 'appIcons/paint.png';
    static powerPrezz = imgFolder + 'appIcons/powerprezz.png';
    static video = imgFolder + 'appIcons/video.png';
}

export class FileIcon {
    static applicationIcon = imgFolder + 'fileIcons/applicationIcon.png';
    static markdown = imgFolder + 'fileIcons/markdown2.png';
    static discord = imgFolder + 'fileIcons/discord.svg';
    static picture = imgFolder + 'fileIcons/picture.png';
    static android = imgFolder + 'fileIcons/android.png';
    static success = imgFolder + 'fileIcons/success.png';
    static swagger = imgFolder + 'fileIcons/swagger.png';
    static windows = imgFolder + 'fileIcons/windows.png';
    static behance = imgFolder + 'fileIcons/behance.png';
    static github = imgFolder + 'fileIcons/github.png';
    static nmscd = imgFolder + 'fileIcons/nmscd.png';
    static apple = imgFolder + 'fileIcons/apple2.png';
    static web = imgFolder + 'fileIcons/web.png';
    static powerPrezz = imgFolder + 'fileIcons/presentation.png';
    static video = imgFolder + 'fileIcons/video.png';

    static miniLink = imgFolder + 'fileIcons/externalIcon.png';

    static communityMissionProgressViewer = imgFolder + 'fileIcons/communityMissionProgressViewer.png';
    static expeditionAlphabet = imgFolder + 'fileIcons/expeditionAlphabet.png';
    static nmsColorParser = imgFolder + 'fileIcons/nmsColorParser.png';
    static nmsUniversalFont = imgFolder + 'fileIcons/nmsUniversalFont.png';
    static nmsEnhancedImages = imgFolder + 'fileIcons/nmsEnhancedImages.png';
}

export class MiscIcon {
    static iotPublication = imgFolder + 'IoTPublication.png';
    static iotPublication1 = imgFolder + 'IoTPublication1.png';
    static iotPublication2 = imgFolder + 'IoTPublication2.png';
    static iotPublication3 = imgFolder + 'IoTPublication3.png';
    static assistantApps = imgFolder + 'assistantApps.png';
    static twitch = imgFolder + 'twitch.png';
    static threeDotsLoader = imgFolder + 'three-dots.svg';

    static streamPreview = vidFolder + 'streamPreview.min.gif';
    static static = vidFolder + 'static.gif';
}

export const Backgrounds = [
    {
        value: 'bg1',
        name: 'OuterSpace (default)',
        url: backgroundsFolder + 'outerSpace.jpg',
    },
    {
        value: 'bg2',
        name: 'DeepSpace',
        url: backgroundsFolder + 'deepSpace.jpg',
    },
    {
        value: 'bg3',
        name: 'Illustration',
        url: backgroundsFolder + 'illustration.jpg',
    },
    {
        value: 'bg4',
        name: 'Interstellar',
        url: backgroundsFolder + 'interstellar.jpg',
    },
    {
        value: 'bg5',
        name: 'SpaceBluePurple',
        url: backgroundsFolder + 'spaceBluePurple.jpg',
    }
];

export const Presentation = {
    entelectbg1: imgFolder + 'presentation/entelectbg.png',
    entelectbg2: imgFolder + 'presentation/entelectbg2.png',
    flyToMali: vidFolder + 'presentation/flyToMali.mp4',
    flyToMaliReverse: vidFolder + 'presentation/flyToMali-reverse.mp4',
    family1: imgFolder + 'presentation/family1.png',
    family2: imgFolder + 'presentation/family2.png',
    family3: imgFolder + 'presentation/family3.png',
    welkom1: imgFolder + 'presentation/welkom.png',
    gold: imgFolder + 'presentation/gold.webp',
    studyingAtUJ: vidFolder + 'presentation/studying.mp4',
    sadiolaGold: vidFolder + 'presentation/sadiola-gold.mp4',
    school2007: imgFolder + 'presentation/school2007.JPG',
    mx: imgFolder + 'presentation/mx.png',
    kilimanjaro: imgFolder + 'presentation/kili.png',
    fish: imgFolder + 'presentation/fish.png',
    bootcamp20171: imgFolder + 'presentation/bootcamp2017-1.jpg',
    bootcamp20172: imgFolder + 'presentation/bootcamp2017-2.jpg',
    workHollard: imgFolder + 'presentation/work-hollard.png',
    workBee123: imgFolder + 'presentation/work-bee123.png',
    workBee123GetGood: imgFolder + 'presentation/work-bee123-get-gud.png',
    flyToAmsterdam: imgFolder + 'presentation/flyToAmsterdam.gif',
    nl: imgFolder + 'presentation/nl.png',
    rabobank: imgFolder + 'presentation/rabobank.jpg',
}

export class External {
    static githubGeneralStats = 'https://github-readme-stats.vercel.app/api?username=Khaoz-Topsy&amp;show_icons=true&amp;line_height=24';
    static githubLanguageStats = 'https://github-readme-stats.vercel.app/api/top-langs?username=Khaoz-Topsy';
    static assistantNmsLoader = 'https://raw.githubusercontent.com/AssistantNMS/nms-loader/main/loader.svg';
}

export const getImageUrlsFromImageClass = (classToUse: any): Array<string> => {
    const urls: Array<string> = [];
    for (const prop in classToUse) {
        if (Object.prototype.hasOwnProperty.call(classToUse, prop)) {
            const value = classToUse[prop];
            urls.push(value);
        }
    }
    return urls;
}

export const imagesToPrecache = () => {
    const images = [
        error,
        getImageUrlsFromImageClass(AppletIcon),
        getImageUrlsFromImageClass(FileIcon),
        getImageUrlsFromImageClass(External),
    ];
    for (const background of Backgrounds) {
        images.push(background.url);
    }
    return images;
};

