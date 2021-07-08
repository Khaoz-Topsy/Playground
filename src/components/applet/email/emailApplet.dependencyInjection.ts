
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { AssistantAppsService } from '../../../services/api/AssistantAppsService';
import { DataService } from '../../../services/DataService';

export interface IExpectedServices {
    dataService: DataService;
    assistantAppsService: AssistantAppsService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        dataService: services.dataService,
        assistantAppsService: services.assistantAppsService,
    }
};