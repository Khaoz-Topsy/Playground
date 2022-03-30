import React, { useEffect } from 'react'
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';

import { IApplet } from '../../../contracts/interface/IApplet'
import { getIframeUrl } from '../../../helper/iframeHelper';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';
import { IFrameApplet } from '../iframe/iframeApplet'

interface IWithoutExpectedServices {
}

interface IExpectedServices {
    virtualAssistantService: VirtualAssistantService;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices, IApplet { }


export const KurtAppletUnconnected: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        props.virtualAssistantService.say?.(translate(LocaleKey.clippyCV));
        props.virtualAssistantService.play?.(virtualAssistantAnimations.getArtsy);
        // eslint-disable-next-line
    }, []);

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

export const KurtApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    KurtAppletUnconnected,
    (services: IDependencyInjection): IExpectedServices => {
        return {
            virtualAssistantService: services.virtualAssistantService,
        }
    }
);
