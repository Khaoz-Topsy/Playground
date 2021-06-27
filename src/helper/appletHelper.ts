import { AppletType } from "../constants/enum/appletType";
import { FileType, IAppletFile, IFile, isApplet } from "../contracts/interface/IFile";
import { openExternal } from './linkHelper';
import { openAppFromDesktop } from '../state/window/reducer';
import { WindowStore } from "../state/window/store";

export const openAppletOrFile = (newFile: IFile) => {
    if (isApplet(newFile)) {
        openApplet(newFile);
        return;
    }

    openFile(newFile);
}

export const openApplet = (newFile: IFile) => {
    const applet = newFile as IAppletFile;
    if (applet.appletType !== AppletType.none) {
        WindowStore.update(openAppFromDesktop(applet.appletType, applet.name, applet.meta));
    }
}

export const openFile = (newFile: IFile) => {
    let appletType: AppletType = AppletType.none;
    if (newFile.type === FileType.image) appletType = AppletType.picture;
    if (newFile.type === FileType.markdown) appletType = AppletType.notes;
    if (newFile.type === FileType.link) {
        if (newFile?.meta?.external != null) {
            openExternal(newFile.meta.external);
        }
        return;
    }
    if (newFile.type === FileType.iframeApplet) {
        if (newFile?.meta?.src != null) {
            WindowStore.update(openAppFromDesktop(AppletType.iframe, newFile.meta.name, newFile.meta));
        }
        return;
    }
    WindowStore.update(openAppFromDesktop(appletType, newFile.name, newFile.meta));
}