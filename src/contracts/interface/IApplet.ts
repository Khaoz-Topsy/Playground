export interface IApplet {
    isFocused?: boolean;
    isMinimised?: boolean;
    onMinimise: () => void;
    onMaximise: () => void;
    onClose: () => void;
}

export interface IAdditionalAppletProps {
    defaultPageIndex?: number;
    isMinimised?: boolean;
}