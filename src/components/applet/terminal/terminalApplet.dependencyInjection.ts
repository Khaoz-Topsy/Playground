
import { IFolder } from '../../../contracts/interface/IFolder';
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { ExternalApiService } from '../../../services/api/ExternalApiService';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';

export interface IExpectedServices {
    folderStructure: IFolder;
    virtualAssistantService: VirtualAssistantService;
    externalApiService: ExternalApiService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        folderStructure: services.folderStructure,
        virtualAssistantService: services.virtualAssistantService,
        externalApiService: services.externalApiService,
    }
};