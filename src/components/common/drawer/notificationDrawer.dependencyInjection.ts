
import { IDependencyInjection } from '../../../integration/dependencyInjection';
import { BlogRssService } from '../../../services/BlogRssService';

export interface IExpectedServices {
    blogRssService: BlogRssService
}

export const dependencyInjectionToProps = (services: IDependencyInjection): IExpectedServices => {
    return {
        blogRssService: services.blogRssService,
    }
};