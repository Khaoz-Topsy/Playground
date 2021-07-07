import React from 'react'

import { defaultMonitorHeight, defaultMonitorWidth } from '../../../constants/window';
import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { IFrameApplet } from '../iframe/iframeApplet'

interface IProps extends IApplet { }

export const MonitorApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}

            meta={{
                style: { zIndex: 2 },
                key: "monitor-iframe",
                name: translate(LocaleKey.monitor),
                src: getIframeUrl(props),
                defaultWidth: defaultMonitorWidth,
                defaultHeight: defaultMonitorHeight,
            }}
        />
    );
}
