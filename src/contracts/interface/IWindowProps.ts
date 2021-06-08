import { IApplet } from "./IApplet";

export interface IWindowProps extends IApplet {
    defaultHeight?: number;
    defaultWidth?: number;
    defaultX?: number;
    defaultY?: number;
    classNames?: string;

    showLoading?: boolean;
    isFullscreen?: boolean;
    isFocused?: boolean;
    isMinimised?: boolean;
    onSetFocus: () => void;
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}