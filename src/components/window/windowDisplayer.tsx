import React, { ReactNode } from 'react';

// Applets
import { SettingApplet } from '../applet/settings/settingApplet';
import { NyanCatApplet } from '../applet/nyanCat/nyanCatApplet';
import { TerminalApplet } from '../applet/terminal/terminalApplet';
import { Explorer } from './explorer/explorer';

import { IApplet } from '../../contracts/interface/IApplet';
import { AppletType } from '../../constants/enum/appletType';

export const windowDisplayer = (appProps: IApplet): ReactNode => {

    switch (appProps.appType) {
        case AppletType.setting: return <SettingApplet key={`AppletType-${appProps.appType}`} {...appProps} />
        case AppletType.nyanCat: return <NyanCatApplet key={`AppletType-${appProps.appType}`} {...appProps} />
        case AppletType.terminal: return <TerminalApplet key={`AppletType-${appProps.appType}`} {...appProps} />
        case AppletType.explorer: return <Explorer key={`AppletType-${appProps.appType}`} {...appProps} />
    }

    return null;
}

