import { AppletType } from "../constants/enum/appletType";
import { IAdditionalAppletProps } from "./interface/IApplet";

export interface LaunchedApp {
    appType: AppletType;
    additionalProps: IAdditionalAppletProps
}