import { ReactNode } from 'react';

// Applets
import { AssistantNMSApplet } from '../applet/assistantApps/assistantNMSApplet';
import { AssistantSMSApplet } from '../applet/assistantApps/assistantSMSApplet';
import { SwaggerApplet } from '../applet/assistantApps/swaggerApplet';
import { BrowserApplet } from '../applet/browser/browserApplet';
import { EmailApplet } from '../applet/email/emailApplet';
import { DiabloApplet } from '../applet/games/diablo';
import { MinecraftClassicApplet } from '../applet/games/minecraft';
import { IFrameApplet } from '../applet/iframe/iframeApplet';
import { KurtApplet } from '../applet/kurt/kurtApplet';
import { LiveTvApplet } from '../applet/kurt/liveTvApplet';
import { MonitorApplet } from '../applet/kurt/monitorApplet';
import { PresentationApplet } from '../applet/kurt/presentationApplet';
import { MusicPlayerApplet } from '../applet/music/musicPlayer';
import { NotesApplet } from '../applet/notes/notesApplet';
import { NyanCatApplet } from '../applet/nyanCat/nyanCatApplet';
import { YellowPagesApplet } from '../applet/phonebook/yellowPagesApplet';
import { PictureApplet } from '../applet/picture/pictureApplet';
import { SettingApplet } from '../applet/settings/settingApplet';
import { TerminalApplet } from '../applet/terminal/terminalApplet';
import { TweetListApplet } from '../applet/tweeter/tweetList';
import { VsCodeApplet } from '../applet/vscode/vscodeApplet';
import { Explorer } from './explorer/explorer';

import { AppletType } from '../../constants/enum/appletType';
import { IApplet } from '../../contracts/interface/IApplet';
import { DigDugApplet } from '../applet/games/digDug';
import { ModelViewerApplet } from '../applet/modelViewer/modelViewerApplet';
import { RadioPlayerApplet } from '../applet/music/radioPlayer';
import { PaintApplet } from '../applet/paint/paint';

export const windowDisplayer = (appProps: IApplet): ReactNode => {
    const appKey = `AppletType-${appProps.appletType}`;

    switch (appProps.appletType) {
        case AppletType.kurt: return <KurtApplet key={appKey} {...appProps} />
        case AppletType.email: return <EmailApplet key={appKey} {...appProps} />
        case AppletType.explorer: return <Explorer key={appKey} {...appProps} />
        case AppletType.notes: return <NotesApplet key={appKey} {...appProps} />
        case AppletType.liveTv: return <LiveTvApplet key={appKey} {...appProps} />
        case AppletType.vsCode: return <VsCodeApplet key={appKey} {...appProps} />
        case AppletType.monitor: return <MonitorApplet key={appKey} {...appProps} />
        case AppletType.swagger: return <SwaggerApplet key={appKey} {...appProps} />
        case AppletType.browser: return <BrowserApplet key={appKey} {...appProps} />
        case AppletType.nyanCat: return <NyanCatApplet key={appKey} {...appProps} />
        case AppletType.picture: return <PictureApplet key={appKey} {...appProps} />
        case AppletType.setting: return <SettingApplet key={appKey} {...appProps} />
        case AppletType.tweeter: return <TweetListApplet key={appKey} {...appProps} />
        case AppletType.terminal: return <TerminalApplet key={appKey} {...appProps} />
        case AppletType.musicPlayer: return <MusicPlayerApplet key={appKey} {...appProps} />
        case AppletType.yellowPages: return <YellowPagesApplet key={appKey} {...appProps} />
        case AppletType.modelViewer: return <ModelViewerApplet key={appKey} {...appProps} />
        case AppletType.assistantNMS: return <AssistantNMSApplet key={appKey} {...appProps} />
        case AppletType.assistantSMS: return <AssistantSMSApplet key={appKey} {...appProps} />
        case AppletType.presentation: return <PresentationApplet key={appKey} {...appProps} />
        case AppletType.minecraft: return <MinecraftClassicApplet key={appKey} {...appProps} />
        case AppletType.diablo: return <DiabloApplet key={appKey} {...appProps} />
        case AppletType.paint: return <PaintApplet key={appKey} {...appProps} />
        case AppletType.radio: return <RadioPlayerApplet key={appKey} {...appProps} />
        case AppletType.digdug: return <DigDugApplet key={appKey} {...appProps} />

        case AppletType.iframe: return <IFrameApplet key={appKey} {...appProps} />
        case AppletType.discordInvite: return <IFrameApplet key={appKey} {...appProps} />
        case AppletType.iotPublication: return <IFrameApplet key={appKey} {...appProps} />
    }

    return null;
}

