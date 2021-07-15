import { IKeyBindSection } from '../contracts/interface/IKeybind';
import { LocaleKey } from '../localization/LocaleKey';

export const knownKeybinds = {
    spotlight: 'ctrl+space',
    spotlightAlt: 'ctrl+k',
    goPrev: 'alt+left',
    goNext: 'alt+right',
    esc: 'escape',
    up: 'up',
    down: 'down',
    konami: 'up up down down left right left right b a enter',
};

export const knownKeyCodes = {
    enter: 13,
    esc: 27,
    up: 38,
    down: 40,
};

export const keybindsPerSection: Array<IKeyBindSection> = [
    {
        name: LocaleKey.general,
        shortcuts: [
            {
                name: LocaleKey.openSearchBar,
                keys: ['ctrl', 'space'],
            },
            {
                name: LocaleKey.openSearchBar,
                keys: ['ctrl', 'k'],
            },
            {
                name: LocaleKey.harlemShake,
                keys: [],
                descrip: LocaleKey.konami,
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