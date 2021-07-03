
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { SillyService } from '../../../services/SillyService';

export interface IExpectedServices {
    sillyService: SillyService
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        sillyService: services.sillyService,
    }
};