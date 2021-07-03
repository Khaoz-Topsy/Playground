import { AppletType } from "../../constants/enum/appletType";
import { LocaleKey } from "../../localization/LocaleKey";

export interface IApplet {
    appletType: AppletType;
    name: LocaleKey;
    meta: any;
    isFocused?: boolean;
    isMinimised?: boolean;
    isMaximised?: boolean;
    zIndex?: number;

    defaultX?: number;
    defaultY?: number;

    onSetFocus: (e: any) => void;
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

export interface IAdditionalAppletProps {
    defaultPageIndex?: number;
    isMinimised?: boolean;
    isMaximised?: boolean;
    notOpen?: boolean;
}