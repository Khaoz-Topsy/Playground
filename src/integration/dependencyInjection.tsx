import React from 'react';
import { anyObject } from '../helper/typescriptHacks';

import { VirtualAssistantService } from '../services/VirtualAssistantService';

export interface IDependencyInjection {
    virtualAssistantService: VirtualAssistantService;
}

type GetServices = () => IDependencyInjection;
export const defaultDependencyInjectionFunc: GetServices = () => {
    return {
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