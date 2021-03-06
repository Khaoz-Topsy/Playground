import { IAppletInfo } from './IFile';
import { AppletType } from '../../constants/enum/appletType';
import { LocaleKey } from '../../localization/LocaleKey';

export interface IApplet {
    guid: string;
    appletType: AppletType;
    name: LocaleKey;
    meta: any;
    info?: IAppletInfo;
    isFocused?: boolean;
    isMinimised?: boolean;
    isMaximised?: boolean;
    handleUnfocusedClick?: boolean;
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