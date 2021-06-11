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

    // Funny
    nyanCat,
}

export const appletsThatCanHaveTheirNamesChanged: Array<AppletType> = [
    AppletType.explorer,
    AppletType.picture,
    AppletType.notes,
]