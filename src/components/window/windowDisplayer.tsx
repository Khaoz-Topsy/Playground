import React, { ReactNode } from 'react';

// Applets
import { SettingApplet } from '../applet/settings/settingApplet';
import { NyanCatApplet } from '../applet/nyanCat/nyanCatApplet';
import { TerminalApplet } from '../applet/terminal/terminalApplet';
import { PictureApplet } from '../applet/picture/pictureApplet';
import { VsCodeApplet } from '../applet/vscode/vscodeApplet';
import { IFrameApplet } from '../applet/iframe/iframeApplet';
import { NotesApplet } from '../applet/notes/notesApplet';
import { KurtApplet } from '../applet/kurt/kurtApplet';
import { Explorer } from './explorer/explorer';

import { IApplet } from '../../contracts/interface/IApplet';
import { AppletType } from '../../constants/enum/appletType';

export const windowDisplayer = (appProps: IApplet): ReactNode => {

    switch (appProps.appletType) {
        case AppletType.setting: return <SettingApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.terminal: return <TerminalApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.explorer: return <Explorer key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.picture: return <PictureApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.notes: return <NotesApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.iframe: return <IFrameApplet key={`AppletType-${appProps.appletType}`} {...appProps} />

        case AppletType.kurt: return <KurtApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.vsCode: return <VsCodeApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
        case AppletType.nyanCat: return <NyanCatApplet key={`AppletType-${appProps.appletType}`} {...appProps} />
    }

    return null;
}

