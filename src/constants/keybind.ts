import { IKeyBindSection } from '../contracts/interface/IKeybind';
import { FoundSecretType } from './enum/foundSecretType';

export const knownKeybinds = {
    spotlight: 'ctrl+space',
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
        name: 'General',
        shortcuts: [
            {
                name: 'Open Search Bar',
                keys: ['ctrl', 'space']
            },
            {
                name: 'Harlem Shake',
                keys: [],
                descrip: 'konami code',
                requiredSecret: FoundSecretType.harlemShake,
            }
        ]
    },
    {
        name: 'Search bar',
        shortcuts: [
            {
                name: 'Navigate up in search results list',
                keys: ['⬆']
            },
            {
                name: 'Navigate down in search results list',
                keys: ['⬇']
            },
            {
                name: 'Open selected app in search results list',
                keys: ['enter']
            }
        ]
    },
    {
        name: 'File Explorer',
        shortcuts: [
            {
                name: 'Go back to previous folder',
                keys: ['alt', '⬅']
            },
            {
                name: 'Go forward in folder history',
                keys: ['alt', '➡']
            }
        ]
    }
]