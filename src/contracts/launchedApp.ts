import { AppletType } from "../constants/enum/appletType";
import { IAdditionalAppletProps } from "./interface/IApplet";

export interface LaunchedApp {
    name: string;
    openOrder: number;
    appletType: AppletType;
    meta: IAdditionalAppletProps;
}