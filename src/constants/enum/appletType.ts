export enum AppletType {
    none,

    setting,
    terminal,
    explorer,
    picture,
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

    // Funny
    nyanCat,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
]