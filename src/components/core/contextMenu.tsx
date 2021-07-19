import React, { ReactNode } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { Icon } from '@chakra-ui/react';
import classNames from 'classnames';

import { translate } from '../../integration/i18n';
import { LocaleKey } from '../../localization/LocaleKey';

export enum OptionState {
    None,
    Divider,
    Disabled,
    Important,
    NoAccess,
}

export interface IContextMenuItemProps {
    name: LocaleKey;
    optionState?: OptionState;
    onClick?: (e: any) => void;
    icon?: any;
}

interface IContextMenuProps {
    baseKey: string;
    style?: React.CSSProperties;
    className?: string;
    children: ReactNode;
    items: Array<IContextMenuItemProps>;
    onClick?: (e: any) => void;
    onContextOpen?: () => void;
    onContextClose?: () => void;
}

const initialState: IContextMenuState = {
    isOpen: false,
    mouseX: null,
    mouseY: null,
}

interface IContextMenuState {
    isOpen: boolean,
    mouseX: number | null,
    mouseY: number | null,
}

export const ContextMenuWrapper: React.FC<IContextMenuProps> = (props: IContextMenuProps) => {
    const [menuState, setMenuState] = React.useState<IContextMenuState>(initialState);

    const handleClick = (event: any) => {
        event.preventDefault();
        if (menuState.isOpen) {
            setMenuState(initialState);
            return;
        }

        props.onContextOpen?.();
        setMenuState({
            isOpen: true,
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        props.onContextClose?.();
        setMenuState(initialState);
    };

    const handleItemClick = (menuItemOnClick?: (e: any) => void) => (e: any) => {
        handleClose();
        menuItemOnClick?.(e);
    };

    const renderMenuItem = (menuItem: IContextMenuItemProps, index: number) => {
        const menuItemKey = `${props.baseKey}-${menuItem.name}-${index}`;
        if (menuItem?.optionState === OptionState.Divider) return (<hr key={menuItemKey} />);

        const noAccess = menuItem.optionState === OptionState.NoAccess;
        const classesObj = {
            'important': noAccess || menuItem.optionState === OptionState.Important,
            'disabled': noAccess || menuItem.optionState === OptionState.Disabled,
        };
        return (
            <MenuItem
                key={menuItemKey}
                disabled={menuItem?.optionState === OptionState.Disabled}
                className={classNames(classesObj)}
                onClick={handleItemClick(menuItem.onClick)}
            >
                {(menuItem.icon != null) && <Icon as={menuItem.icon} mr={2} />}
                {translate(menuItem.name)}
            </MenuItem>
        );
    }

    return (
        <div
            className={props.className}
            style={{ ...props.style, pointerEvents: 'all' }}
            onClick={props.onClick}
            onContextMenu={handleClick}
        >
            {props.children}
            <Menu
                open={menuState.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    menuState.mouseY !== null && menuState.mouseX !== null
                        ? { top: menuState.mouseY, left: menuState.mouseX }
                        : undefined
                }
            >
                {props.items.map(renderMenuItem)}
            </Menu>
        </div>
    );
}