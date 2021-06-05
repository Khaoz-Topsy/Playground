import { AppletType } from "../../constants/enum/appletType";

export interface IApplet {
    appType: AppletType;
    title: string;
    isFocused?: boolean;
    isMinimised?: boolean;
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