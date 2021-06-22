import { AppletType } from "../../constants/enum/appletType";

export interface IApplet {
    appletType: AppletType;
    name: string;
    meta: any;
    isFocused?: boolean;
    isMinimised?: boolean;
    isMaximised?: boolean;
    zIndex?: number;
    onSetFocus: (e: any) => void;
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

export interface IAdditionalAppletProps {
    defaultPageIndex?: number;
    isMinimised?: boolean;
    notOpen?: boolean;
}