
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { DataService } from '../../../services/DataService';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';

export interface IExpectedServices {
    dataService: DataService;
    virtualAssistantService: VirtualAssistantService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        dataService: services.dataService,
        virtualAssistantService: services.virtualAssistantService,
    }
};