import { useEffect } from 'react';
import { ReactDoPainting } from 'react-do-painting';
import { virtualAssistantAnimations } from '../../../constants/virtualAssistantAnim';
import { IApplet } from '../../../contracts/interface/IApplet';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';
import { Applet } from '../../window/applet/applet';

interface IWithoutExpectedServices {
}

interface IExpectedServices {
    virtualAssistantService: VirtualAssistantService;
}

interface IProps extends IWithoutExpectedServices, IExpectedServices, IApplet { }


export const PaintAppletUnconnected: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        props.virtualAssistantService.say?.(translate(LocaleKey.clippyCV));
        props.virtualAssistantService.play?.(virtualAssistantAnimations.getArtsy);
        // eslint-disable-next-line
    }, []);

    return (
        <Applet
            {...props}
            isFullscreen={true}
        >
            <div className="paint-wrapper" style={{ backgroundColor: 'white' }}>
                <ReactDoPainting />
            </div>
        </Applet>
    );
}

export const PaintApplet = withServices<IWithoutExpectedServices, IExpectedServices>(
    PaintAppletUnconnected,
    (services: IDependencyInjection): IExpectedServices => {
        return {
            virtualAssistantService: services.virtualAssistantService,
        }
    }
);
