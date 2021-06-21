
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { KurtApiService } from '../../../services/api/KurtApiService';

export interface IExpectedServices {
    kurtApiService: KurtApiService
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        kurtApiService: services.kurtApiService,
    }
};