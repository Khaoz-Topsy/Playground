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

    // Funny
    nyanCat,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
];

export const appletsHiddenFromApplicationFolder: Array<AppletType> = [
    AppletType.explorer,
];