interface FsDocumentElement extends HTMLElement {
    msRequestFullscreen?: () => void;
    mozRequestFullScreen?: () => void;
    webkitRequestFullscreen?: () => void;
}

interface FsDocument extends HTMLDocument {
    webkitIsFullScreen?: boolean;
    mozFullScreen?: boolean;
    msFullscreenElement?: Element;
}

const fullscreenClassName = 'full-screen';

export const isFullscreen = (): boolean => {
    const elementsWithFullscreen = document.getElementsByClassName(fullscreenClassName);
    return elementsWithFullscreen.length > 0;
};

export const hasFullscreenSupport = (): boolean => {
    const fsDoc = document as FsDocument;
    return !!(
        fsDoc.fullscreenElement ||
        fsDoc.webkitIsFullScreen ||
        fsDoc.mozFullScreen ||
        fsDoc.msFullscreenElement
    );
};

export const enterFullScreen = (): void => {
    if (!hasFullscreenSupport()) {
        try {
            const element = document.documentElement as FsDocumentElement;
            if (element.requestFullscreen) element.requestFullscreen();
            else if (element.msRequestFullscreen) element.msRequestFullscreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
            element.classList.add(fullscreenClassName);
        } catch (e: any) { }
    }
};

export const exitFullScreen = (): void => {
    try {
        const element = document.getElementById('html') as FsDocumentElement;
        element?.classList?.remove?.(fullscreenClassName);
        document?.exitFullscreen?.();
    } catch (e: any) { }
};

export const setFontClass = (fontClass: string): void => {
    try {
        const element = document.getElementById('app');
        const classList = (element?.classList ?? []) as Array<string>;
        for (const clsItem of classList) {
            if (clsItem.includes('font-')) element?.classList?.remove?.(clsItem);
        }
        element?.classList?.add?.(fontClass);
    } catch (e: any) { }
};