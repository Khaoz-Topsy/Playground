import React from 'react';
import classNames from 'classnames';

import { BasicImage } from '../../core/image';
import { IStartMenuItemProps, StartMenuSize } from '../../../contracts/interface/IFile';
import { translate } from '../../../integration/i18n';
import { LocaleKey } from '../../../localization/LocaleKey';
import { ContextMenuWrapper } from '../../core/contextMenu';
import { getContextWrapperItems } from './startMenuContextMenuItems';

interface IProps extends IStartMenuItemProps {
    id: number;
    name: LocaleKey;
    imgUrl: string;
    size: StartMenuSize;
    onClick: (e: any) => void;
}

export const StartMenuTile: React.FC<IProps> = (props: IProps) => {
    const baseCss = `tile tile-${StartMenuSize[props.size]}`;
    const styleObj = {
        backgroundColor: props.backgroundColour,
        backgroundImage: props.backgroundImage,
        color: props.textColour,
    };
    return (
        <ContextMenuWrapper
            key={props.id}
            baseKey={props.id.toString()}
            className={classNames(baseCss, { 'full': props.isFull })}
            style={styleObj}
            items={getContextWrapperItems({ sMenu: props, showUninstall: true, openApp: props?.onClick })}
        >
            <BasicImage imageUrl={props.imgUrl} onClick={props?.onClick} />
            <p onClick={props?.onClick}>{translate(props.name)}</p>
        </ContextMenuWrapper>
    );
}

