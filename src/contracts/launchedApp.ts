import { AppletType } from "../constants/enum/appletType";
import { IAdditionalAppletProps } from "./interface/IApplet";

export interface LaunchedApp {
    title: string;
    openOrder: number;
    appType: AppletType;
    meta: IAdditionalAppletProps;
}