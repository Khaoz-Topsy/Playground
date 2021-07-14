import { AppletType } from "../constants/enum/appletType";
import { LocaleKey } from "../localization/LocaleKey";
import { IAdditionalAppletProps } from "./interface/IApplet";

export interface LaunchedApp {
    guid: string;
    name: LocaleKey;
    openOrder: number;
    appletType: AppletType;
    meta: IAdditionalAppletProps;
}

export interface NotLaunchedApp extends LaunchedApp {
    isActive: boolean;
}

export const isNotLaunched = (app: LaunchedApp | NotLaunchedApp): app is NotLaunchedApp => {
    return (app as NotLaunchedApp).isActive !== undefined;
}