export enum AppletType {
    none,

    setting,
    terminal,
    explorer,
    picture,
    notes,
    iframe,

    kurt,
    vsCode,
    assistantNMS,
    assistantSMS,
    musicPlayer,

    // Funny
    nyanCat,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
]