import React from 'react'

import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { IFrameApplet } from '../iframe/iframeApplet'

interface IProps extends IApplet { }

export const KurtApplet: React.FC<IProps> = (props: IProps) => {
    return (
        <IFrameApplet
            {...props}
            meta={{
                style: { zIndex: 2 },
                key: "kurt-iframe",
                name: translate(LocaleKey.kurtLourensCV),
                src: getIframeUrl(props),
            }}
        />
    );
}
