import { site } from '../constants/site';

export const appendRef = (baseUrl: string) => {
    if (baseUrl.includes(site.url) || baseUrl.includes('@')) return baseUrl;
    if (baseUrl.includes('?')) {
        return baseUrl + `&ref=${site.ref}`;
    }
    return baseUrl + `?ref=${site.ref}`;
};

export const openExternalInNewTab = (url: string) => {
    if (url == null) return;
    window.open(appendRef(url), '_blank', 'noopener,noreferrer');
}
export const openExternalInNewWindow = (url: string) => {
    if (url == null) return;
    window.open(appendRef(url), url, 'noopener,noreferrer,width=800,height=600');
}