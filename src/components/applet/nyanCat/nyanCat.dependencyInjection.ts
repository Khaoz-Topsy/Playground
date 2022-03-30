
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { SillyService } from '../../../services/SillyService';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';

export interface IExpectedServices {
    sillyService: SillyService;
    virtualAssistantService: VirtualAssistantService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        sillyService: services.sillyService,
        virtualAssistantService: services.virtualAssistantService,
    }
};