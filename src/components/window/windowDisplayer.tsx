import React, { ReactNode } from 'react';

// Applets
import { Explorer } from './explorer/explorer';
import { KurtApplet } from '../applet/kurt/kurtApplet';
import { EmailApplet } from '../applet/email/emailApplet';
import { NotesApplet } from '../applet/notes/notesApplet';
import { IFrameApplet } from '../applet/iframe/iframeApplet';
import { VsCodeApplet } from '../applet/vscode/vscodeApplet';
import { PictureApplet } from '../applet/picture/pictureApplet';
import { NyanCatApplet } from '../applet/nyanCat/nyanCatApplet';
import { MusicPlayerApplet } from '../applet/music/musicPlayer';
import { SettingApplet } from '../applet/settings/settingApplet';
import { TerminalApplet } from '../applet/terminal/terminalApplet';
import { AssistantSMSApplet } from '../applet/assistantApps/assistantSMSApplet';

import { IApplet } from '../../contracts/interface/IApplet';
import { AppletType } from '../../constants/enum/appletType';

export const windowDisplayer = (appProps: IApplet): ReactNode => {
    const appKey = `AppletType-${appProps.appletType}`;

    switch (appProps.appletType) {
        case AppletType.kurt: return <KurtApplet key={appKey} {...appProps} />
        case AppletType.email: return <EmailApplet key={appKey} {...appProps} />
        case AppletType.explorer: return <Explorer key={appKey} {...appProps} />
        case AppletType.notes: return <NotesApplet key={appKey} {...appProps} />
        case AppletType.iframe: return <IFrameApplet key={appKey} {...appProps} />
        case AppletType.vsCode: return <VsCodeApplet key={appKey} {...appProps} />
        case AppletType.nyanCat: return <NyanCatApplet key={appKey} {...appProps} />
        case AppletType.picture: return <PictureApplet key={appKey} {...appProps} />
        case AppletType.setting: return <SettingApplet key={appKey} {...appProps} />
        case AppletType.terminal: return <TerminalApplet key={appKey} {...appProps} />
        case AppletType.musicPlayer: return <MusicPlayerApplet key={appKey} {...appProps} />
        case AppletType.assistantSMS: return <AssistantSMSApplet key={appKey} {...appProps} />
    }

    return null;
}

