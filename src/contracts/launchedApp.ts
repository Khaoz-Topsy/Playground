import { AppletType } from "../constants/enum/appletType";
import { IAdditionalAppletProps } from "./interface/IApplet";

export interface LaunchedApp {
    name: string;
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