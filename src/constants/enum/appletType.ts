export enum AppletType {
    none,

    setting,
    terminal,
    explorer,
    picture,
    tweeter,
    email,
    notes,
    iframe,

    kurt,
    vsCode,
    assistantNMS,
    assistantSMS,
    musicPlayer,
    monitor,
    liveTv,
    discordInvite,
    iotPublication,
    presentation,
    swagger,
    yellowPages,
    browser,
    paint,
    modelViewer,
    radio,
    powerPrezz,
    video,

    // Funny
    nyanCat,
    minecraft,
    diablo,
    digdug,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
    AppletType.video,
    AppletType.powerPrezz,
];

export const appletsHiddenFromApplicationFolder: Array<AppletType> = [
    AppletType.explorer,
];