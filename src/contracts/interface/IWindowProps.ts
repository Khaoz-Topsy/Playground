import { IApplet } from "./IApplet";

export interface IWindowProps extends IApplet {
    defaultHeight?: number;
    defaultWidth?: number;
    classNames?: string;

    showLoading?: boolean;
    refreshOnResize?: boolean;
    handleUnfocusedClick?: boolean;

    isFullscreen?: boolean;
    isFocused?: boolean;
    isMinimised?: boolean;
    onSetFocus: (e: any) => void;
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}