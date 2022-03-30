
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { AssistantAppsService } from '../../../services/api/AssistantAppsService';
import { DataService } from '../../../services/DataService';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';

export interface IExpectedServices {
    dataService: DataService;
    assistantAppsService: AssistantAppsService;
    virtualAssistantService: VirtualAssistantService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        dataService: services.dataService,
        assistantAppsService: services.assistantAppsService,
        virtualAssistantService: services.virtualAssistantService,
    }
};