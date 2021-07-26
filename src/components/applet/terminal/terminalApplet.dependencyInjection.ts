
import { IFolder } from '../../../contracts/interface/IFolder';
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { VirtualAssistantService } from '../../../services/VirtualAssistantService';

export interface IExpectedServices {
    folderStructure: IFolder;
    virtualAssistantService: VirtualAssistantService;
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        virtualAssistantService: services.virtualAssistantService,
        folderStructure: services.folderStructure,
    }
};