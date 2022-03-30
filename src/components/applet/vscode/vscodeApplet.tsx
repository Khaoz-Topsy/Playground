import React, { useEffect } from 'react'
import { site } from '../../../constants/site';
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';

import { IApplet } from '../../../contracts/interface/IApplet'
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';
import { Applet } from '../../window/applet/applet'

interface IWithoutExpectedServices {
}

interface IExpectedServices {
    virtualAssistantService: VirtualAssistantService;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices, IApplet { }

export const VsCodeAppletUnconnected: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        props.virtualAssistantService.say?.(translate(LocaleKey.clippyVsCode));
        props.virtualAssistantService.play?.(virtualAssistantAnimations.getWizardy);
        // eslint-disable-next-line
    }, []);

    const githubUrl = props?.meta?.url ?? site.repo;
    return (
        <Applet
            key="vsCodeWindow"
            {...props}
            showLoading={true}
            isFullscreen={true}
        >
            <iframe
                id="vsCodeIframe"
                key="vsCodeIframe"
                title="vsCodeIframe"
                className="pos-abs-top-left"
                style={{ zIndex: 2 }}
                src={githubUrl}
                frameBorder="0"
            />
        </Applet>
    );
}

export const VsCodeApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    VsCodeAppletUnconnected,
    (services: IDependencyInjection): IExpectedServices => {
        return {
            virtualAssistantService: services.virtualAssistantService,
        }
    }
);
