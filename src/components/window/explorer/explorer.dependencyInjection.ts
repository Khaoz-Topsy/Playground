
import { IFolder } from '../../../contracts/interface/IFolder';
import { IDependencyInjection } from '../../../integration/dependencyInjection';

export interface IExpectedServices {
    folderStructure: IFolder
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        folderStructure: services.folderStructure,
    }
};