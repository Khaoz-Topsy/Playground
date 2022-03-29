import React from 'react';

import { IFolder } from '../contracts/interface/IFolder';
import { anyObject } from '../helper/typescriptHacks';

import { DataService } from '../services/DataService';
import { AssistantAppsService } from '../services/api/AssistantAppsService';
import { VirtualAssistantService } from '../services/VirtualAssistantService';
import { StorageService } from '../services/StorageService';
import { AnalyticsService } from '../services/AnalyticsService';
import { SillyService } from '../services/SillyService';
import { getFilesOnDisk } from '../constants/filesOnDisk';
import { ExternalApiService } from '../services/api/ExternalApiService';

export interface IDependencyInjection {
    // Common
    folderStructure: IFolder,
    dataService: DataService;
    storageService: StorageService;
    analyticsService: AnalyticsService;
    sillyService: SillyService;

    // Network
    externalApiService: ExternalApiService;
    assistantAppsService: AssistantAppsService;
    virtualAssistantService: VirtualAssistantService;
}

type GetServices = () => IDependencyInjection;
export const defaultDependencyInjectionFunc: GetServices = () => {
    const storageService = new StorageService();
    const analyticsService = new AnalyticsService();
    return {
        // Common
        folderStructure: getFilesOnDisk(),
        dataService: new DataService(),
        storageService,
        analyticsService,
        sillyService: new SillyService(),

        // Network
        externalApiService: new ExternalApiService(),
        assistantAppsService: new AssistantAppsService(storageService),
        virtualAssistantService: new VirtualAssistantService(),
    }
}

export const DependencyInjectionContext = React.createContext<IDependencyInjection>(anyObject);

export const DependencyInjectionProvider: React.FC = ({ children }) => {
    return (
        <DependencyInjectionContext.Provider value={defaultDependencyInjectionFunc()}>
            {children}
        </DependencyInjectionContext.Provider>
    );
};

export function withDependencyInjectionProvider<TProps>(WrappedComponent: any): (React.FC<TProps>) {
    return (props: TProps) => (
        <DependencyInjectionContext.Provider value={defaultDependencyInjectionFunc()}>
            <WrappedComponent {...props} />
        </DependencyInjectionContext.Provider>
    );
};

export function withServices<WithoutExpectedServicesType, ExpectedServicesType>(WrappedComponent: any, mapper: (services: IDependencyInjection) => ExpectedServicesType) {
    const wrapper: React.FC<WithoutExpectedServicesType> = (props: WithoutExpectedServicesType) => {
        return (
            <DependencyInjectionContext.Consumer>
                {
                    (services: IDependencyInjection) =>
                        <WrappedComponent {...(mapper(services))} {...props} />
                }
            </DependencyInjectionContext.Consumer>
        );
    }
    return wrapper;
}