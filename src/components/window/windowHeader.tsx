import React, { ReactNode } from 'react';

import { translate } from '../../integration/i18n';
import { LocaleKey } from '../../localization/LocaleKey';
import { WindowActions } from './windowActions';

interface IProps {
    name: LocaleKey;
    windowIcon?: ReactNode;
    onMinimise: (e: any) => void;
    onMaximise: (e: any) => void;
    onClose: (e: any) => void;
}

export const WindowHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <div className="window-header">
            {
                props.windowIcon != null &&
                <div className="window-icon">
                    {props.windowIcon}
                </div>
            }
            <div className="content noselect">
                {translate(props.name)}
            </div>
            <WindowActions {...props} />
        </div>
    );
}

