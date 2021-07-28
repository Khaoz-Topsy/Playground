import React from 'react';
import classNames from 'classnames';

import { ContextMenuWrapper, OptionState } from '../../core/contextMenu';
import { IAppletFile } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { windowIcon } from '../../window/windowIcon';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface IProps {
    index: number;
    iconData: IAppletFile;
    selectedIconIndexes: Array<number>
    setSelected: (index: number) => (e: any) => void;
    openApp: (index: number) => (e: any) => void;
    openAppProperties: () => void;
}

export const DesktopIcon: React.FC<IProps> = (props: IProps) => {
    const classes = classNames('desktop-icon-slot noselect', {
        'selected': props.selectedIconIndexes.includes(props.index)
    });
    return (
        <ContextMenuWrapper
            key={props.iconData.id}
            baseKey={props.iconData.id.toString()}
            items={[
                {
                    name: props.iconData.name,
                    optionState: OptionState.UnSelectable,
                },
                {
                    name: (props.iconData.name.toString() + 'divider') as any,
                    optionState: OptionState.Divider,
                },
                {
                    name: LocaleKey.runApplication,
                    onClick: props.openApp,
                },
                {
                    name: LocaleKey.runAsAdministrator,
                    optionState: OptionState.Disabled,
                },
                {
                    name: 'properties divider' as any,
                    optionState: OptionState.Divider,
                },
                {
                    name: LocaleKey.properties,
                    icon: InfoOutlineIcon,
                    onClick: props.openAppProperties,
                }
            ]}
        >
            <div
                data-index={props.index}
                className={classes}
                draggable={false}
                // onClick={props?.setSelected?.(props.index)}
                onDoubleClick={props?.openApp?.(props.index)}
            >
                {windowIcon(props.iconData.appletType)}
                <p draggable={false}>{translate(props.iconData.name)}</p>
            </div>
        </ContextMenuWrapper>
    );
}

