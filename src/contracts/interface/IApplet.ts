export interface IApplet {
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