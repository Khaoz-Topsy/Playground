import ReactGA from 'react-ga';

import { log } from '../integration/logging';

export class AnalyticsService {
    private _analyticsEnabled: boolean;

    constructor() {
        this._analyticsEnabled = window.config.googleAnalyticsEnabled;
        if (this._analyticsEnabled) {
            ReactGA.initialize('G-ETFQJ92RG1');
            ReactGA.pageview(window.location.pathname + window.location.search);
        }

        log('Initialized Analytics');
    }

    trackEvent = (analyticsEvent: string) => {
        if (!this._analyticsEnabled) return;

        const event = {
            category: analyticsEvent,
            action: analyticsEvent,
        };
        ReactGA.event(event);
        log('trackEvent', event);
    }

    trackPageView = (url: string) => {
        if (!this._analyticsEnabled) return;

        ReactGA.pageview(url);

        log('trackPageView', url);
    }
}
