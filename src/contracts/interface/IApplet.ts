import { AppletType } from "../../constants/enum/appletType";

export interface IApplet {
    appletType: AppletType;
    name: string;
    meta: any;
    isFocused?: boolean;
    isMinimised?: boolean;
    isMaximised?: boolean;
    zIndex?: number;
    onSetFocus: () => void;
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export interface IAdditionalAppletProps {
    defaultPageIndex?: number;
    isMinimised?: boolean;
}