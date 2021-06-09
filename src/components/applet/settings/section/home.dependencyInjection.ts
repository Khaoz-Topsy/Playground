
import { IDependencyInjection } from '../../../../integration/dependencyInjection';
import { VirtualAssistantService } from '../../../../services/VirtualAssistantService';

export interface IExpectedServices {
    virtualAssistantService: VirtualAssistantService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        virtualAssistantService: services.virtualAssistantService,
    }
};