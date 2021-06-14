import React from 'react';
import { anyObject } from '../helper/typescriptHacks';

import { DataService } from '../services/DataService';
import { BlogRssService } from '../services/BlogRssService';
import { VirtualAssistantService } from '../services/VirtualAssistantService';
import { StorageService } from '../services/StorageService';

export interface IDependencyInjection {
    // Common
    dataService: DataService;
    storageService: StorageService;

    // Network
    blogRssService: BlogRssService;
    virtualAssistantService: VirtualAssistantService;
}

type GetServices = () => IDependencyInjection;
export const defaultDependencyInjectionFunc: GetServices = () => {
    const storageService = new StorageService();
    return {
        // Common
        dataService: new DataService(),
        storageService,

        // Network
        blogRssService: new BlogRssService(storageService),
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