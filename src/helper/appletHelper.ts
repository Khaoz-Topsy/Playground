import { Store } from 'pullstate';

import { AppletType } from '../constants/enum/appletType';
import { FileType, IAppletFile, IFile, isApplet } from '../contracts/interface/IFile';
import { openExternalInNewTab } from './linkHelper';
import { openAppFromDesktop } from '../state/window/reducer';
import { IWindowStore } from '../state/window/store';

export const openAppletOrFile = (windowStore: Store<IWindowStore>, newAppOrFile: IAppletFile | IFile) => {
    if (isApplet(newAppOrFile)) {
        const applet = newAppOrFile as IAppletFile;
        openApplet(windowStore, applet);
        return;
    }

    const file = newAppOrFile as IFile;
    openFile(windowStore, file);
}

export const openApplet = (windowStore: Store<IWindowStore>, applet: IAppletFile) => {
    if (applet.appletType !== AppletType.none) {
        windowStore.update(openAppFromDesktop(applet.appletType, applet.name, applet.meta));
    }
}

export const openFile = (windowStore: Store<IWindowStore>, newFile: IFile) => {
    let appletType: AppletType = AppletType.none;
    if (newFile.type === FileType.image) appletType = AppletType.picture;
    if (newFile.type === FileType.markdown) appletType = AppletType.notes;
    if (newFile.type === FileType.link) {
        if (newFile?.meta?.external != null) {
            openExternalInNewTab(newFile.meta.external);
        }
        return;
    }
    if (newFile.type === FileType.model) appletType = AppletType.modelViewer;

    // if (newFile.type === FileType.iframeApplet) {
    //     if (newFile?.meta?.src != null) {
    //         windowStore.update(openAppFromDesktop(AppletType.iframe, newFile.meta.name, newFile.meta));
    //     }
    //     return;
    // }
    windowStore.update(openAppFromDesktop(appletType, newFile.name, newFile.meta));
}