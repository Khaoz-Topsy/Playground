
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { DataService } from '../../../services/DataService';

export interface IExpectedServices {
    dataService: DataService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        dataService: services.dataService,
    }
};