import { IKeyBindSection } from '../contracts/interface/IKeybind';
import { LocaleKey } from '../localization/LocaleKey';

export const knownKeybinds = {
    spotlight: 'ctrl+space',
    spotlightAlt: 'ctrl+k',
    minimiseAll: 'ctrl+down',
    terminalKill: 'ctrl+c',
    goPrev: 'alt+left',
    goNext: 'alt+right',
    minimiseAllAlt: 'alt+down',
    esc: 'escape',
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    konami: 'up up down down left right left right b a enter',
};

export const knownKeyCodes = {
    enter: 13,
    esc: 27,
    up: 38,
    tab: 9,
    down: 40,
};

export const keybindsPerSection: Array<IKeyBindSection> = [
    {
        name: LocaleKey.general,
        shortcuts: [
            {
                name: LocaleKey.openSearchBar,
                keys: ['ctrl', 'space'],
                altKeys: ['ctrl', 'k'],
            },
            {
                name: LocaleKey.minimiseAllWindows,
                keys: ['alt', '⬇'],
                altKeys: ['ctrl', '⬇'],
            },
            {
                name: LocaleKey.harlemShake,
                keys: ['Konami Code'],
                descrip: LocaleKey.konamiCode,
            }
        ]
    },
    {
        name: LocaleKey.searchBar,
        shortcuts: [
            {
                name: LocaleKey.navigateUpInSearch,
                keys: ['⬆']
            },
            {
                name: LocaleKey.navigateDownInSearch,
                keys: ['⬇']
            },
            {
                name: LocaleKey.openInSearch,
                keys: ['enter']
            }
        ]
    },
    {
        name: LocaleKey.explorer,
        shortcuts: [
            {
                name: LocaleKey.goBackInExplorer,
                keys: ['alt', '⬅']
            },
            {
                name: LocaleKey.goForwardInExplorer,
                keys: ['alt', '➡']
            }
        ]
    }
]