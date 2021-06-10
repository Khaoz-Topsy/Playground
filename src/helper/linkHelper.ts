import { site } from '../constants/site';

export const appendRef = (baseUrl: string) => {
    if (baseUrl.includes(site.url) || baseUrl.includes('@')) return baseUrl;
    if (baseUrl.includes('?')) {
        return baseUrl + `&ref=${site.ref}`;
    }
    return baseUrl + `?ref=${site.ref}`;
};

export const openExternal = (url: string) => window.open(appendRef(url), '_blank', 'noopener,noreferrer');