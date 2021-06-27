import ReactGA from 'react-ga';
import { LogService } from './LogService';

export class AnalyticsService {
    private _analyticsEnabled: boolean;
    private _logService: LogService;

    constructor(logService: LogService) {
        this._analyticsEnabled = window.config.googleAnalyticsEnabled;
        if (this._analyticsEnabled) {
            ReactGA.initialize('G-ETFQJ92RG1');
            ReactGA.pageview(window.location.pathname + window.location.search);
        }

        this._logService = logService;
        this._logService.log('Initialized Analytics');
    }

    trackEvent = (analyticsEvent: string) => {
        if (!this._analyticsEnabled) return;

        const event = {
            category: analyticsEvent,
            action: analyticsEvent,
        };
        ReactGA.event(event);
        this._logService.log('trackEvent', event);
    }

    trackPageView = (url: string) => {
        if (!this._analyticsEnabled) return;

        ReactGA.pageview(url);

        this._logService.log('trackPageView', url);
    }
}
